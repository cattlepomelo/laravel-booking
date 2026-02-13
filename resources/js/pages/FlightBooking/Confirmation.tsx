import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function FlightBookingConfirmation({ booking }) {
    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <>
            <Head title={`Booking Confirmed - ${booking.booking_reference}`} />
            <div className="container mx-auto py-6">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                        <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
                        <p className="text-lg text-gray-600">Your flight has been successfully booked</p>
                    </div>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Booking Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Booking Reference</p>
                                    <p className="font-medium">{booking.booking_reference}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <p className="font-medium capitalize">{booking.status}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Booking Date</p>
                                    <p className="font-medium">{formatDate(booking.created_at)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total Amount</p>
                                    <p className="font-medium">${booking.total_price}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Flight Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between mb-6">
                                <div className="text-center">
                                    <div className="font-semibold text-lg">{formatTime(booking.flight.departure_time)}</div>
                                    <div className="text-sm text-gray-500">{booking.flight.departure_airport.code}</div>
                                    <div className="text-sm">{booking.flight.departure_airport.name}</div>
                                </div>
                                
                                <div className="flex flex-col items-center mx-2">
                                    <div className="w-16 h-px bg-gray-300"></div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {Math.floor((new Date(booking.flight.arrival_time) - new Date(booking.flight.departure_time)) / (1000 * 60 * 60))}h 
                                        {Math.floor((new Date(booking.flight.arrival_time) - new Date(booking.flight.departure_time)) / (1000 * 60)) % 60}m
                                    </div>
                                    <div className="text-xs text-gray-500">{booking.flight.aircraft_type}</div>
                                </div>
                                
                                <div className="text-center">
                                    <div className="font-semibold text-lg">{formatTime(booking.flight.arrival_time)}</div>
                                    <div className="text-sm text-gray-500">{booking.flight.arrival_airport.code}</div>
                                    <div className="text-sm">{booking.flight.arrival_airport.name}</div>
                                </div>
                            </div>
                            
                            <div className="text-center">
                                <div className="text-lg font-semibold">{formatDate(booking.flight.departure_time)}</div>
                                <div className="text-sm text-gray-500">{booking.flight.flight_number}</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Passengers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {booking.passengers.map((passenger, index) => (
                                    <li key={passenger.id} className="flex justify-between border-b pb-2">
                                        <span>{passenger.first_name} {passenger.last_name}</span>
                                        <span className="text-sm text-gray-500">{passenger.passport_number}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/bookings">
                            <Button variant="outline" className="w-full sm:w-auto">
                                View All Bookings
                            </Button>
                        </Link>
                        <Link href="/book-flight">
                            <Button className="w-full sm:w-auto">
                                Book Another Flight
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}