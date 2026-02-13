import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';

export default function FlightBookingSearch({ airports }) {
    const [formData, setFormData] = useState({
        from_airport_id: '',
        to_airport_id: '',
        departure_date: '',
        return_date: '',
        passenger_count: '1',
        trip_type: 'one-way'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/book-flight/search', formData);
    };

    return (
        <>
            <Head title="Book a Flight" />
            <div className="container mx-auto py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Book a Flight</h1>
                    <Link href="/dashboard">
                        <Button variant="outline">Back to Dashboard</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Search Flights</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Trip Type Selection */}
                                <div className="md:col-span-2">
                                    <Label>Trip Type</Label>
                                    <div className="flex space-x-4 mt-2">
                                        <button
                                            type="button"
                                            className={`px-4 py-2 rounded-md border ${
                                                formData.trip_type === 'one-way' 
                                                    ? 'bg-blue-100 border-blue-500 text-blue-700' 
                                                    : 'border-gray-300'
                                            }`}
                                            onClick={() => setFormData({...formData, trip_type: 'one-way'})}
                                        >
                                            One Way
                                        </button>
                                        <button
                                            type="button"
                                            className={`px-4 py-2 rounded-md border ${
                                                formData.trip_type === 'round-trip' 
                                                    ? 'bg-blue-100 border-blue-500 text-blue-700' 
                                                    : 'border-gray-300'
                                            }`}
                                            onClick={() => setFormData({...formData, trip_type: 'round-trip'})}
                                        >
                                            Round Trip
                                        </button>
                                    </div>
                                </div>

                                {/* From and To Airports */}
                                <div>
                                    <Label htmlFor="from_airport_id">From</Label>
                                    <Select 
                                        name="from_airport_id" 
                                        value={formData.from_airport_id}
                                        onValueChange={(value) => setFormData({...formData, from_airport_id: value})}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select departure airport" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {airports.map(airport => (
                                                <SelectItem key={airport.id} value={airport.id.toString()}>
                                                    {airport.city}, {airport.name} ({airport.code})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <div>
                                    <Label htmlFor="to_airport_id">To</Label>
                                    <Select 
                                        name="to_airport_id" 
                                        value={formData.to_airport_id}
                                        onValueChange={(value) => setFormData({...formData, to_airport_id: value})}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select destination airport" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {airports.map(airport => (
                                                <SelectItem key={airport.id} value={airport.id.toString()}>
                                                    {airport.city}, {airport.name} ({airport.code})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Departure and Return Dates */}
                                <div>
                                    <Label htmlFor="departure_date">Departure Date</Label>
                                    <Input
                                        id="departure_date"
                                        name="departure_date"
                                        type="date"
                                        value={formData.departure_date}
                                        onChange={handleChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                </div>
                                
                                {formData.trip_type === 'round-trip' && (
                                    <div>
                                        <Label htmlFor="return_date">Return Date</Label>
                                        <Input
                                            id="return_date"
                                            name="return_date"
                                            type="date"
                                            value={formData.return_date}
                                            onChange={handleChange}
                                            min={formData.departure_date || new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                )}

                                {/* Passenger Count */}
                                <div>
                                    <Label htmlFor="passenger_count">Passengers</Label>
                                    <Select 
                                        name="passenger_count" 
                                        value={formData.passenger_count}
                                        onValueChange={(value) => setFormData({...formData, passenger_count: value})}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Number of passengers" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                                <SelectItem key={num} value={num.toString()}>
                                                    {num} {num === 1 ? 'Passenger' : 'Passengers'}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            
                            <div className="flex justify-end pt-4">
                                <Button type="submit">Search Flights</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}