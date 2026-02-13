import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function BookingsIndex({ bookings, filters }) {
    const [search, setSearch] = useState(filters?.search || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit search via Inertia
        window.location.href = `/bookings?search=${encodeURIComponent(search)}`;
    };

    return (
        <>
            <Head title="Bookings" />
            <div className="container mx-auto py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Bookings</h1>
                    <Link href="/bookings/create">
                        <Button>Add Booking</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Search Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <div className="relative flex-1">
                                <Input
                                    type="text"
                                    placeholder="Search bookings..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </div>
                            <Button type="submit">Search</Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="mt-6 overflow-x-auto">
                    <table className="min-w-full bg-white border rounded-lg">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {bookings.data.map((booking) => (
                                <tr key={booking.id}>
                                    <td className="py-4 px-4 whitespace-nowrap">{booking.booking_reference}</td>
                                    <td className="py-4 px-4 whitespace-nowrap">{booking.user.name}</td>
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="mr-2">
                                                {booking.flight.departure_airport.image_url && (
                                                    <img 
                                                        src={booking.flight.departure_airport.image_url} 
                                                        alt={booking.flight.departure_airport.name}
                                                        className="w-6 h-6 rounded-full object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <div>{booking.flight.flight_number}</div>
                                                <div className="text-xs">
                                                    {booking.flight.departure_airport.code} → {booking.flight.arrival_airport.code}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 whitespace-nowrap">${booking.total_price}</td>
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        {new Date(booking.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <div className="flex space-x-2">
                                            <Link href={`/bookings/${booking.id}`} className="text-blue-600 hover:text-blue-900">
                                                View
                                            </Link>
                                            <Link href={`/bookings/${booking.id}/edit`} className="text-green-600 hover:text-green-900">
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (confirm('Are you sure you want to delete this booking?')) {
                                                        fetch(`/bookings/${booking.id}`, {
                                                            method: 'DELETE',
                                                            headers: {
                                                                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                                                'Content-Type': 'application/json',
                                                            },
                                                        }).then(() => {
                                                            window.location.reload();
                                                        });
                                                    }
                                                }}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="mt-4 flex justify-between items-center">
                        <div>
                            Showing {bookings.from} to {bookings.to} of {bookings.total} results
                        </div>
                        <div className="flex space-x-2">
                            {bookings.links.map((link, index) => (
                                link.url && (
                                    <a
                                        key={index}
                                        href={link.url}
                                        className={`px-3 py-1 rounded ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}