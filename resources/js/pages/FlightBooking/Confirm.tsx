import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useState } from 'react';

export default function FlightBookingConfirm({ outboundFlight, returnFlight, passengerCount }) {
    const [passengerDetails, setPassengerDetails] = useState(
        Array.from({ length: parseInt(passengerCount) }, (_, i) => ({
            first_name: '',
            last_name: '',
            date_of_birth: '',
            passport_number: '',
            nationality: ''
        }))
    );

    const handlePassengerChange = (index, field, value) => {
        const updatedPassengers = [...passengerDetails];
        updatedPassengers[index][field] = value;
        setPassengerDetails(updatedPassengers);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Calculate total price
        let totalPrice = parseFloat(outboundFlight.price) * passengerCount;
        if (returnFlight) {
            totalPrice += parseFloat(returnFlight.price) * passengerCount;
        }

        router.post('/book-flight', {
            outbound_flight_id: outboundFlight.id,
            return_flight_id: returnFlight ? returnFlight.id : null,
            passenger_count: passengerCount,
            passenger_details: passengerDetails,
            total_price: totalPrice.toFixed(2),
            return_total_price: returnFlight ? (parseFloat(returnFlight.price) * passengerCount).toFixed(2) : null
        });
    };

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <>
            <Head title="Confirm Booking" />
            <div className="container mx-auto py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Confirm Booking</h1>
                    <Link href="/book-flight">
                        <Button variant="outline">Back to Search</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Flight Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Outbound Flight */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Outbound Flight</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="text-center">
                                            <div className="font-semibold text-lg">{formatTime(outboundFlight.departure_time)}</div>
                                            <div className="text-sm text-gray-500">{outboundFlight.departure_airport.code}</div>
                                        </div>
                                        
                                        <div className="flex flex-col items-center mx-2">
                                            <div className="w-16 h-px bg-gray-300"></div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {Math.floor((new Date(outboundFlight.arrival_time) - new Date(outboundFlight.departure_time)) / (1000 * 60 * 60))}h 
                                                {Math.floor((new Date(outboundFlight.arrival_time) - new Date(outboundFlight.departure_time)) / (1000 * 60)) % 60}m
                                            </div>
                                        </div>
                                        
                                        <div className="text-center">
                                            <div className="font-semibold text-lg">{formatTime(outboundFlight.arrival_time)}</div>
                                            <div className="text-sm text-gray-500">{outboundFlight.arrival_airport.code}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="text-right">
                                        <div className="text-xl font-bold text-blue-600">${outboundFlight.price} × {passengerCount}</div>
                                        <div className="text-sm text-gray-500">{outboundFlight.flight_number}</div>
                                    </div>
                                </div>
                                
                                <div className="text-sm text-gray-600">
                                    {outboundFlight.departure_airport.name} to {outboundFlight.arrival_airport.name} • 
                                    {formatDate(outboundFlight.departure_time)}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Return Flight (if round trip) */}
                        {returnFlight && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Return Flight</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="text-center">
                                                <div className="font-semibold text-lg">{formatTime(returnFlight.departure_time)}</div>
                                                <div className="text-sm text-gray-500">{returnFlight.departure_airport.code}</div>
                                            </div>
                                            
                                            <div className="flex flex-col items-center mx-2">
                                                <div className="w-16 h-px bg-gray-300"></div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {Math.floor((new Date(returnFlight.arrival_time) - new Date(returnFlight.departure_time)) / (1000 * 60 * 60))}h 
                                                    {Math.floor((new Date(returnFlight.arrival_time) - new Date(returnFlight.departure_time)) / (1000 * 60)) % 60}m
                                                </div>
                                            </div>
                                            
                                            <div className="text-center">
                                                <div className="font-semibold text-lg">{formatTime(returnFlight.arrival_time)}</div>
                                                <div className="text-sm text-gray-500">{returnFlight.arrival_airport.code}</div>
                                            </div>
                                        </div>
                                        
                                        <div className="text-right">
                                            <div className="text-xl font-bold text-blue-600">${returnFlight.price} × {passengerCount}</div>
                                            <div className="text-sm text-gray-500">{returnFlight.flight_number}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="text-sm text-gray-600">
                                        {returnFlight.departure_airport.name} to {returnFlight.arrival_airport.name} • 
                                        {formatDate(returnFlight.departure_time)}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Passenger Details Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Passenger Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {passengerDetails.map((passenger, index) => (
                                        <div key={index} className="border-t pt-4">
                                            <h3 className="font-medium mb-3">Passenger {index + 1}</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor={`first_name_${index}`}>First Name</Label>
                                                    <Input
                                                        id={`first_name_${index}`}
                                                        value={passenger.first_name}
                                                        onChange={(e) => handlePassengerChange(index, 'first_name', e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor={`last_name_${index}`}>Last Name</Label>
                                                    <Input
                                                        id={`last_name_${index}`}
                                                        value={passenger.last_name}
                                                        onChange={(e) => handlePassengerChange(index, 'last_name', e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor={`date_of_birth_${index}`}>Date of Birth</Label>
                                                    <Input
                                                        id={`date_of_birth_${index}`}
                                                        type="date"
                                                        value={passenger.date_of_birth}
                                                        onChange={(e) => handlePassengerChange(index, 'date_of_birth', e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor={`passport_number_${index}`}>Passport Number</Label>
                                                    <Input
                                                        id={`passport_number_${index}`}
                                                        value={passenger.passport_number}
                                                        onChange={(e) => handlePassengerChange(index, 'passport_number', e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <Label htmlFor={`nationality_${index}`}>Nationality</Label>
                                                    <Select 
                                                        value={passenger.nationality}
                                                        onValueChange={(value) => handlePassengerChange(index, 'nationality', value)}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select nationality" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="American">American</SelectItem>
                                                            <SelectItem value="British">British</SelectItem>
                                                            <SelectItem value="Canadian">Canadian</SelectItem>
                                                            <SelectItem value="French">French</SelectItem>
                                                            <SelectItem value="German">German</SelectItem>
                                                            <SelectItem value="Japanese">Japanese</SelectItem>
                                                            <SelectItem value="Australian">Australian</SelectItem>
                                                            <SelectItem value="Other">Other</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="pt-4">
                                        <Button type="submit" className="w-full">Complete Booking</Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Booking Summary */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Booking Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span>Outbound Flight ({passengerCount} × ${outboundFlight.price})</span>
                                        <span>${(parseFloat(outboundFlight.price) * passengerCount).toFixed(2)}</span>
                                    </div>
                                    
                                    {returnFlight && (
                                        <div className="flex justify-between">
                                            <span>Return Flight ({passengerCount} × ${returnFlight.price})</span>
                                            <span>${(parseFloat(returnFlight.price) * passengerCount).toFixed(2)}</span>
                                        </div>
                                    )}
                                    
                                    <div className="border-t pt-2">
                                        <div className="flex justify-between font-bold">
                                            <span>Total</span>
                                            <span>
                                                ${(parseFloat(outboundFlight.price) * passengerCount + 
                                                  (returnFlight ? parseFloat(returnFlight.price) * passengerCount : 0)).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}