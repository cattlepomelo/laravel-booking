import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';

export default function ShowFlight({ flight }) {
    return (
        <>
            <Head title={`Flight ${flight.flight_number}`} />
            <div className="container mx-auto py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Flight {flight.flight_number}</h1>
                    <div className="space-x-2">
                        <Link href="/flights">
                            <Button variant="outline">Back to Flights</Button>
                        </Link>
                        <Link href={`/flights/${flight.id}/edit`}>
                            <Button>Edit</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Flight Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between">
                                <span className="font-medium">Flight Number:</span>
                                <span>{flight.flight_number}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Aircraft Type:</span>
                                <span>{flight.aircraft_type}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Capacity:</span>
                                <span>{flight.capacity}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Price:</span>
                                <span>${flight.price}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Route Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <span className="font-medium">Departure:</span>
                                    <div className="flex items-center mt-2">
                                        {flight.departure_airport.image_url && (
                                            <img 
                                                src={flight.departure_airport.image_url} 
                                                alt={flight.departure_airport.name}
                                                className="w-16 h-16 rounded-lg mr-4 object-cover"
                                            />
                                        )}
                                        <div>
                                            <div className="font-semibold">{flight.departure_airport.name} ({flight.departure_airport.code})</div>
                                            <div>{flight.departure_airport.city}, {flight.departure_airport.country}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center mx-4">
                                    <div className="text-gray-500">→</div>
                                    <div className="text-xs text-gray-500 mt-1">Duration: {Math.floor((new Date(flight.arrival_time) - new Date(flight.departure_time)) / (1000 * 60 * 60))}h {(Math.floor((new Date(flight.arrival_time) - new Date(flight.departure_time)) / (1000 * 60)) % 60)}m</div>
                                </div>
                                <div className="flex-1 text-right">
                                    <span className="font-medium">Arrival:</span>
                                    <div className="flex items-center mt-2 justify-end">
                                        <div className="text-right mr-4">
                                            <div className="font-semibold">{flight.arrival_airport.name} ({flight.arrival_airport.code})</div>
                                            <div>{flight.arrival_airport.city}, {flight.arrival_airport.country}</div>
                                        </div>
                                        {flight.arrival_airport.image_url && (
                                            <img 
                                                src={flight.arrival_airport.image_url} 
                                                alt={flight.arrival_airport.name}
                                                className="w-16 h-16 rounded-lg object-cover"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between mt-4">
                                <div>
                                    <span className="font-medium">Departure Time:</span><br />
                                    <span>{new Date(flight.departure_time).toLocaleString()}</span>
                                </div>
                                <div>
                                    <span className="font-medium">Arrival Time:</span><br />
                                    <span>{new Date(flight.arrival_time).toLocaleString()}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Danger Zone</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-600">Delete this flight permanently</p>
                                <button
                                    onClick={() => {
                                        if (confirm('Are you sure you want to delete this flight? This action cannot be undone.')) {
                                            fetch(`/flights/${flight.id}`, {
                                                method: 'DELETE',
                                                headers: {
                                                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                                    'Content-Type': 'application/json',
                                                },
                                            }).then(() => {
                                                window.location.href = '/flights';
                                            });
                                        }
                                    }}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Delete Flight
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}