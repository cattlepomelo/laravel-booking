import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Checkbox } from '@/Components/ui/checkbox';
import { useState } from 'react';

export default function CreateBooking({ flights, users, passengers }) {
    const [formData, setFormData] = useState({
        user_id: '',
        flight_id: '',
        status: 'pending',
        total_price: '',
        passenger_ids: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'passenger_ids' ? value : value
        }));
    };

    const handleCheckboxChange = (passengerId) => {
        setFormData(prev => {
            const newPassengerIds = prev.passenger_ids.includes(passengerId)
                ? prev.passenger_ids.filter(id => id !== passengerId)
                : [...prev.passenger_ids, passengerId];
                
            return {
                ...prev,
                passenger_ids: newPassengerIds
            };
        });
    };

    const handleFlightChange = (flightId) => {
        setFormData(prev => ({
            ...prev,
            flight_id: flightId
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        router.post('/bookings', formData, {
            onError: (errors) => {
                console.log(errors);
            }
        });
    };

    return (
        <>
            <Head title="Create Booking" />
            <div className="container mx-auto py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Create Booking</h1>
                    <Link href="/bookings">
                        <Button variant="outline">Back to Bookings</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Booking Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="user_id">User</Label>
                                        <Select 
                                            name="user_id" 
                                            value={formData.user_id}
                                            onValueChange={(value) => setFormData({...formData, user_id: value})}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select user" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {users.map(user => (
                                                    <SelectItem key={user.id} value={user.id.toString()}>
                                                        {user.name} ({user.email})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="flight_id">Flight</Label>
                                        <Select 
                                            name="flight_id" 
                                            value={formData.flight_id}
                                            onValueChange={handleFlightChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select flight" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {flights.map(flight => (
                                                    <SelectItem key={flight.id} value={flight.id.toString()}>
                                                        {flight.flight_number} - {flight.departure_airport.code} → {flight.arrival_airport.code}
                                                        ({new Date(flight.departure_time).toLocaleString()})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="status">Status</Label>
                                        <Select 
                                            name="status" 
                                            value={formData.status}
                                            onValueChange={(value) => setFormData({...formData, status: value})}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="total_price">Total Price</Label>
                                        <Input
                                            id="total_price"
                                            name="total_price"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={formData.total_price}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div>
                                        <Label>Select Passengers</Label>
                                        <div className="border rounded-md p-4 max-h-96 overflow-y-auto">
                                            {passengers.length > 0 ? (
                                                passengers.map(passenger => (
                                                    <div key={passenger.id} className="flex items-center space-x-2 mb-2">
                                                        <Checkbox
                                                            id={`passenger-${passenger.id}`}
                                                            checked={formData.passenger_ids.includes(passenger.id.toString())}
                                                            onCheckedChange={() => handleCheckboxChange(passenger.id.toString())}
                                                        />
                                                        <label 
                                                            htmlFor={`passenger-${passenger.id}`}
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                            {passenger.first_name} {passenger.last_name} ({passenger.passport_number})
                                                        </label>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-gray-500">No passengers available</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex justify-end space-x-2 pt-4">
                                <Link href="/bookings">
                                    <Button type="button" variant="outline">Cancel</Button>
                                </Link>
                                <Button type="submit">Create Booking</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}