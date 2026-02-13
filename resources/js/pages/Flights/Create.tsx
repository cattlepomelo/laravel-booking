import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';

export default function CreateFlight({ airports }) {
    const [formData, setFormData] = useState({
        flight_number: '',
        departure_airport_id: '',
        arrival_airport_id: '',
        departure_time: '',
        arrival_time: '',
        aircraft_type: '',
        capacity: '',
        price: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        router.post('/flights', formData, {
            onError: (errors) => {
                console.log(errors);
            }
        });
    };

    return (
        <>
            <Head title="Create Flight" />
            <div className="container mx-auto py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Create Flight</h1>
                    <Link href="/flights">
                        <Button variant="outline">Back to Flights</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Flight Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="flight_number">Flight Number</Label>
                                    <Input
                                        id="flight_number"
                                        name="flight_number"
                                        type="text"
                                        value={formData.flight_number}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <Label htmlFor="aircraft_type">Aircraft Type</Label>
                                    <Input
                                        id="aircraft_type"
                                        name="aircraft_type"
                                        type="text"
                                        value={formData.aircraft_type}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <Label htmlFor="departure_airport_id">Departure Airport</Label>
                                    <Select 
                                        name="departure_airport_id" 
                                        value={formData.departure_airport_id}
                                        onValueChange={(value) => setFormData({...formData, departure_airport_id: value})}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select departure airport" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {airports.map(airport => (
                                                <SelectItem key={airport.id} value={airport.id.toString()}>
                                                    {airport.name} ({airport.code}) - {airport.city}, {airport.country}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <div>
                                    <Label htmlFor="arrival_airport_id">Arrival Airport</Label>
                                    <Select 
                                        name="arrival_airport_id" 
                                        value={formData.arrival_airport_id}
                                        onValueChange={(value) => setFormData({...formData, arrival_airport_id: value})}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select arrival airport" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {airports.map(airport => (
                                                <SelectItem key={airport.id} value={airport.id.toString()}>
                                                    {airport.name} ({airport.code}) - {airport.city}, {airport.country}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <div>
                                    <Label htmlFor="departure_time">Departure Time</Label>
                                    <Input
                                        id="departure_time"
                                        name="departure_time"
                                        type="datetime-local"
                                        value={formData.departure_time}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <Label htmlFor="arrival_time">Arrival Time</Label>
                                    <Input
                                        id="arrival_time"
                                        name="arrival_time"
                                        type="datetime-local"
                                        value={formData.arrival_time}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <Label htmlFor="capacity">Capacity</Label>
                                    <Input
                                        id="capacity"
                                        name="capacity"
                                        type="number"
                                        min="1"
                                        value={formData.capacity}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <Label htmlFor="price">Price</Label>
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="flex justify-end space-x-2 pt-4">
                                <Link href="/flights">
                                    <Button type="button" variant="outline">Cancel</Button>
                                </Link>
                                <Button type="submit">Create Flight</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}