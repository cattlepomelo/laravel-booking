import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';

export default function FlightBookingSearchResults({ flights, returnFlights, searchCriteria, airports }) {
    const { from_airport_id, to_airport_id, departure_date, return_date, passenger_count, trip_type } = searchCriteria;
    
    const fromAirport = airports.find(airport => airport.id === parseInt(from_airport_id));
    const toAirport = airports.find(airport => airport.id === parseInt(to_airport_id));

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const calculateDuration = (departure, arrival) => {
        const dep = new Date(departure);
        const arr = new Date(arrival);
        const diffMs = arr - dep;
        const diffHrs = Math.floor(diffMs / 3600000);
        const diffMins = Math.floor((diffMs % 3600000) / 60000);
        return `${diffHrs}h ${diffMins}m`;
    };

    const selectFlight = (flightId, returnFlightId = null) => {
        const params = {
            outbound_flight_id: flightId,
            passenger_count: passenger_count
        };
        
        if (returnFlightId) {
            params.return_flight_id = returnFlightId;
        }
        
        router.get('/book-flight/confirm', params);
    };

    return (
        <>
            <Head title="Search Results" />
            <div className="container mx-auto py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Search Results</h1>
                    <Link href="/book-flight">
                        <Button variant="outline">Modify Search</Button>
                    </Link>
                </div>

                <div className="space-y-8">
                    {/* Outbound Flights */}
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {fromAirport?.city} to {toAirport?.city}
                                <span className="block text-sm font-normal text-gray-500">
                                    {formatDate(departure_date)} • {passenger_count} {passenger_count > 1 ? 'passengers' : 'passenger'}
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {flights.length > 0 ? (
                                <div className="space-y-4">
                                    {flights.map(flight => (
                                        <div key={flight.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex justify-between items-center">
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-4">
                                                            <div className="text-center">
                                                                <div className="font-semibold text-lg">{formatTime(flight.departure_time)}</div>
                                                                <div className="text-sm text-gray-500">{flight.departure_airport.code}</div>
                                                            </div>
                                                            
                                                            <div className="flex flex-col items-center mx-2">
                                                                <div className="w-16 h-px bg-gray-300"></div>
                                                                <div className="text-xs text-gray-500 mt-1">
                                                                    {calculateDuration(flight.departure_time, flight.arrival_time)}
                                                                </div>
                                                                <div className="text-xs text-gray-500">{flight.aircraft_type}</div>
                                                            </div>
                                                            
                                                            <div className="text-center">
                                                                <div className="font-semibold text-lg">{formatTime(flight.arrival_time)}</div>
                                                                <div className="text-sm text-gray-500">{flight.arrival_airport.code}</div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="text-right">
                                                            <div className="text-xl font-bold text-blue-600">${flight.price}</div>
                                                            <Badge variant="secondary">{flight.flight_number}</Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="ml-4">
                                                    <Button 
                                                        onClick={() => {
                                                            if (trip_type === 'round-trip' && returnFlights.length > 0) {
                                                                // For round trips, we'll need to select return flight too
                                                                // For now, just pass the outbound flight ID
                                                                selectFlight(flight.id);
                                                            } else {
                                                                selectFlight(flight.id);
                                                            }
                                                        }}
                                                    >
                                                        Select
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4">No flights found for your criteria. Please try different dates or airports.</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Return Flights (for round trips) */}
                    {trip_type === 'round-trip' && returnFlights && returnFlights.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    {toAirport?.city} to {fromAirport?.city}
                                    <span className="block text-sm font-normal text-gray-500">
                                        {formatDate(return_date)} • Return Flight
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {returnFlights.map(flight => (
                                        <div key={flight.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex justify-between items-center">
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-4">
                                                            <div className="text-center">
                                                                <div className="font-semibold text-lg">{formatTime(flight.departure_time)}</div>
                                                                <div className="text-sm text-gray-500">{flight.departure_airport.code}</div>
                                                            </div>
                                                            
                                                            <div className="flex flex-col items-center mx-2">
                                                                <div className="w-16 h-px bg-gray-300"></div>
                                                                <div className="text-xs text-gray-500 mt-1">
                                                                    {calculateDuration(flight.departure_time, flight.arrival_time)}
                                                                </div>
                                                                <div className="text-xs text-gray-500">{flight.aircraft_type}</div>
                                                            </div>
                                                            
                                                            <div className="text-center">
                                                                <div className="font-semibold text-lg">{formatTime(flight.arrival_time)}</div>
                                                                <div className="text-sm text-gray-500">{flight.arrival_airport.code}</div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="text-right">
                                                            <div className="text-xl font-bold text-blue-600">${flight.price}</div>
                                                            <Badge variant="secondary">{flight.flight_number}</Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="ml-4">
                                                    <Button 
                                                        onClick={() => selectFlight(searchCriteria.outbound_flight_id || flights[0]?.id, flight.id)}
                                                    >
                                                        Select
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {trip_type === 'round-trip' && returnFlights && returnFlights.length === 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Return Flights</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-500 text-center py-4">No return flights found for your selected return date. Please try different dates.</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </>
    );
}