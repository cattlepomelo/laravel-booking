<?php

namespace App\Http\Controllers;

use App\Models\Flight;
use App\Models\Airport;
use App\Models\Passenger;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FlightBookingController extends Controller
{
    /**
     * Show the form for booking a flight.
     */
    public function index()
    {
        $airports = Airport::orderBy('city')->orderBy('name')->get();
        
        return Inertia::render('FlightBooking/Search', [
            'airports' => $airports,
        ]);
    }

    /**
     * Search for available flights based on criteria.
     */
    public function search(Request $request)
    {
        $request->validate([
            'from_airport_id' => 'required|exists:airports,id',
            'to_airport_id' => 'required|exists:airports,id|different:from_airport_id',
            'departure_date' => 'required|date|after_or_equal:today',
            'passenger_count' => 'required|integer|min:1|max:10',
            'trip_type' => 'required|in:one-way,round-trip',
            'return_date' => 'nullable|required_if:trip_type,round-trip|date|after:departure_date',
        ]);

        $flights = Flight::with(['departureAirport', 'arrivalAirport'])
            ->where('departure_airport_id', $request->from_airport_id)
            ->where('arrival_airport_id', $request->to_airport_id)
            ->whereDate('departure_time', $request->departure_date)
            ->orderBy('departure_time')
            ->get();

        $returnFlights = collect();
        if ($request->trip_type === 'round-trip' && $request->return_date) {
            $returnFlights = Flight::with(['departureAirport', 'arrivalAirport'])
                ->where('departure_airport_id', $request->to_airport_id)
                ->where('arrival_airport_id', $request->from_airport_id)
                ->whereDate('departure_time', $request->return_date)
                ->orderBy('departure_time')
                ->get();
        }

        $airports = Airport::orderBy('city')->orderBy('name')->get();

        return Inertia::render('FlightBooking/SearchResults', [
            'flights' => $flights,
            'returnFlights' => $returnFlights,
            'searchCriteria' => $request->only([
                'from_airport_id', 'to_airport_id', 'departure_date', 
                'return_date', 'passenger_count', 'trip_type'
            ]),
            'airports' => $airports,
        ]);
    }

    /**
     * Show the booking confirmation page.
     */
    public function showBookingForm(Request $request)
    {
        $request->validate([
            'outbound_flight_id' => 'required|exists:flights,id',
            'return_flight_id' => 'nullable|exists:flights,id',
            'passenger_count' => 'required|integer|min:1|max:10',
        ]);

        $outboundFlight = Flight::with(['departureAirport', 'arrivalAirport'])->findOrFail($request->outbound_flight_id);
        $returnFlight = null;
        
        if ($request->return_flight_id) {
            $returnFlight = Flight::with(['departureAirport', 'arrivalAirport'])->findOrFail($request->return_flight_id);
        }

        return Inertia::render('FlightBooking/Confirm', [
            'outboundFlight' => $outboundFlight,
            'returnFlight' => $returnFlight,
            'passengerCount' => $request->passenger_count,
        ]);
    }

    /**
     * Store a newly created booking in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'outbound_flight_id' => 'required|exists:flights,id',
            'return_flight_id' => 'nullable|exists:flights,id',
            'passenger_count' => 'required|integer|min:1|max:10',
            'passenger_details' => 'required|array',
            'passenger_details.*.first_name' => 'required|string|max:255',
            'passenger_details.*.last_name' => 'required|string|max:255',
            'passenger_details.*.date_of_birth' => 'required|date',
            'passenger_details.*.passport_number' => 'required|string|max:50',
            'passenger_details.*.nationality' => 'required|string|max:100',
        ]);

        // Create the booking
        $booking = Booking::create([
            'user_id' => auth()->id(),
            'flight_id' => $request->outbound_flight_id,
            'status' => 'pending',
            'total_price' => $request->total_price, // This would come from the frontend
            'booking_reference' => strtoupper(substr(md5(uniqid()), 0, 8)),
        ]);

        // Create passengers and attach to booking
        foreach ($request->passenger_details as $passengerData) {
            $passenger = Passenger::create([
                'first_name' => $passengerData['first_name'],
                'last_name' => $passengerData['last_name'],
                'date_of_birth' => $passengerData['date_of_birth'],
                'passport_number' => $passengerData['passport_number'],
                'nationality' => $passengerData['nationality'],
                'email' => auth()->user()->email, // Use the authenticated user's email
            ]);

            // Attach passenger to booking
            $booking->passengers()->attach($passenger->id);
        }

        // If round trip, create return booking
        if ($request->return_flight_id) {
            $returnBooking = Booking::create([
                'user_id' => auth()->id(),
                'flight_id' => $request->return_flight_id,
                'status' => 'pending',
                'total_price' => $request->return_total_price, // This would come from the frontend
                'booking_reference' => strtoupper(substr(md5(uniqid()), 0, 8)),
            ]);

            // Attach the same passengers to the return booking
            foreach ($request->passenger_details as $passengerData) {
                // Find the passenger we just created
                $passenger = Passenger::where([
                    'first_name' => $passengerData['first_name'],
                    'last_name' => $passengerData['last_name'],
                    'passport_number' => $passengerData['passport_number']
                ])->first();

                if ($passenger) {
                    $returnBooking->passengers()->attach($passenger->id);
                }
            }
        }

        return redirect()->route('flight-booking.confirmation', $booking->id)->with('success', 'Booking confirmed successfully!');
    }
    
    /**
     * Show the booking confirmation page.
     */
    public function showBookingConfirmation($id)
    {
        $booking = Booking::with(['user', 'flight.departureAirport', 'flight.arrivalAirport', 'passengers'])->findOrFail($id);

        // Make sure the authenticated user owns this booking
        if ($booking->user_id !== auth()->id()) {
            abort(403, 'Unauthorized to view this booking');
        }

        return Inertia::render('FlightBooking/Confirmation', [
            'booking' => $booking,
        ]);
    }
}
