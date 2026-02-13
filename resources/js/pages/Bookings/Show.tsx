import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';

export default function ShowBooking({ booking }) {
    return (
        <>
            <Head title={`Booking ${booking.booking_reference}`} />
            <div className="container mx-auto py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Booking {booking.booking_reference}</h1>
                    <div className="space-x-2">
                        <Link href="/bookings">
                            <Button variant="outline">Back to Bookings</Button>
                        </Link>
                        <Link href={`/bookings/${booking.id}/edit`}>
                            <Button>Edit</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Booking Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between">
                                <span className="font-medium">Reference:</span>
                                <span>{booking.booking_reference}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Status:</span>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Total Price:</span>
                                <span>${booking.total_price}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Booking Date:</span>
                                <span>{new Date(booking.booking_date).toLocaleDateString()}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>User Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between">
                                <span className="font-medium">Name:</span>
                                <span>{booking.user.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Email:</span>
                                <span>{booking.user.email}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Flight Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span className="font-medium">Flight Number:</span>
                                <span>{booking.flight.flight_number}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Aircraft Type:</span>
                                <span>{booking.flight.aircraft_type}</span>
                            </div>
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <span className="font-medium">Departure:</span>
                                    <div className="flex items-center mt-2">
                                        {booking.flight.departure_airport.image_url && (
                                            <img 
                                                src={booking.flight.departure_airport.image_url} 
                                                alt={booking.flight.departure_airport.name}
                                                className="w-12 h-12 rounded-lg mr-3 object-cover"
                                            />
                                        )}
                                        <div>
                                            <div className="font-semibold">{booking.flight.departure_airport.name} ({booking.flight.departure_airport.code})</div>
                                            <div>{booking.flight.departure_airport.city}, {booking.flight.departure_airport.country}</div>
                                            <div className="text-sm text-gray-600">{new Date(booking.flight.departure_time).toLocaleString()}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center mx-4">
                                    <div className="text-gray-500 text-xl">✈️</div>
                                    <div className="text-xs text-gray-500 mt-1">Duration: {Math.floor((new Date(booking.flight.arrival_time) - new Date(booking.flight.departure_time)) / (1000 * 60 * 60))}h {(Math.floor((new Date(booking.flight.arrival_time) - new Date(booking.flight.departure_time)) / (1000 * 60)) % 60)}m</div>
                                </div>
                                <div className="flex-1 text-right">
                                    <span className="font-medium">Arrival:</span>
                                    <div className="flex items-center mt-2 justify-end">
                                        <div className="text-right mr-3">
                                            <div className="font-semibold">{booking.flight.arrival_airport.name} ({booking.flight.arrival_airport.code})</div>
                                            <div>{booking.flight.arrival_airport.city}, {booking.flight.arrival_airport.country}</div>
                                            <div className="text-sm text-gray-600">{new Date(booking.flight.arrival_time).toLocaleString()}</div>
                                        </div>
                                        {booking.flight.arrival_airport.image_url && (
                                            <img 
                                                src={booking.flight.arrival_airport.image_url} 
                                                alt={booking.flight.arrival_airport.name}
                                                className="w-12 h-12 rounded-lg object-cover"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Passengers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {booking.passengers.map(passenger => (
                                    <li key={passenger.id} className="border-b pb-2">
                                        <div className="font-medium">{passenger.first_name} {passenger.last_name}</div>
                                        <div className="text-sm text-gray-600">Passport: {passenger.passport_number}</div>
                                        <div className="text-sm text-gray-600">Nationality: {passenger.nationality}</div>
                                    </li>
                                ))}
                                {booking.passengers.length === 0 && (
                                    <li className="text-gray-500">No passengers assigned</li>
                                )}
                            </ul>
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
                                <p className="text-sm text-gray-600">Delete this booking permanently</p>
                                <button
                                    onClick={() => {
                                        if (confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
                                            fetch(`/bookings/${booking.id}`, {
                                                method: 'DELETE',
                                                headers: {
                                                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                                    'Content-Type': 'application/json',
                                                },
                                            }).then(() => {
                                                window.location.href = '/bookings';
                                            });
                                        }
                                    }}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Delete Booking
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}