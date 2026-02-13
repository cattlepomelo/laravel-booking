import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function FlightsIndex({ flights, filters }) {
    const [search, setSearch] = useState(filters?.search || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit search via Inertia
        window.location.href = `/flights?search=${encodeURIComponent(search)}`;
    };

    return (
        <>
            <Head title="Flights" />
            <div className="container mx-auto py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Flights</h1>
                    <Link href="/flights/create">
                        <Button>Add Flight</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Search Flights</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <div className="relative flex-1">
                                <Input
                                    type="text"
                                    placeholder="Search flights..."
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
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight Number</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrival</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure Time</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrival Time</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {flights.data.map((flight) => (
                                <tr key={flight.id}>
                                    <td className="py-4 px-4 whitespace-nowrap">{flight.flight_number}</td>
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {flight.departure_airport.image_url && (
                                                <img 
                                                    src={flight.departure_airport.image_url} 
                                                    alt={flight.departure_airport.name}
                                                    className="w-8 h-8 rounded-full mr-2 object-cover"
                                                />
                                            )}
                                            <div>
                                                <div>{flight.departure_airport.name} ({flight.departure_airport.code})</div>
                                                <div className="text-xs text-gray-500">{flight.departure_airport.city}, {flight.departure_airport.country}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {flight.arrival_airport.image_url && (
                                                <img 
                                                    src={flight.arrival_airport.image_url} 
                                                    alt={flight.arrival_airport.name}
                                                    className="w-8 h-8 rounded-full mr-2 object-cover"
                                                />
                                            )}
                                            <div>
                                                <div>{flight.arrival_airport.name} ({flight.arrival_airport.code})</div>
                                                <div className="text-xs text-gray-500">{flight.arrival_airport.city}, {flight.arrival_airport.country}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        {new Date(flight.departure_time).toLocaleString()}
                                    </td>
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        {new Date(flight.arrival_time).toLocaleString()}
                                    </td>
                                    <td className="py-4 px-4 whitespace-nowrap">${flight.price}</td>
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <div className="flex space-x-2">
                                            <Link href={`/flights/${flight.id}`} className="text-blue-600 hover:text-blue-900">
                                                View
                                            </Link>
                                            <Link href={`/flights/${flight.id}/edit`} className="text-green-600 hover:text-green-900">
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (confirm('Are you sure you want to delete this flight?')) {
                                                        fetch(`/flights/${flight.id}`, {
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
                            Showing {flights.from} to {flights.to} of {flights.total} results
                        </div>
                        <div className="flex space-x-2">
                            {flights.links.map((link, index) => (
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