<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Flight;
use App\Models\Passenger;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $bookings = Booking::with(['user', 'flight.departureAirport', 'flight.arrivalAirport', 'passengers'])
            ->when($request->search, function ($query, $search) {
                $query->where('booking_reference', 'like', "%{$search}%")
                      ->orWhereHas('user', function ($q) use ($search) {
                          $q->where('name', 'like', "%{$search}%");
                      })
                      ->orWhereHas('flight', function ($q) use ($search) {
                          $q->where('flight_number', 'like', "%{$search}%");
                      });
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $flights = Flight::with(['departureAirport', 'arrivalAirport'])
            ->where('departure_time', '>', now())
            ->orderBy('departure_time')
            ->get();
        $users = User::orderBy('name')->get();
        $passengers = Passenger::orderBy('last_name')->get();
        
        return Inertia::render('Bookings/Create', [
            'flights' => $flights,
            'users' => $users,
            'passengers' => $passengers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'flight_id' => 'required|exists:flights,id',
            'status' => 'required|in:pending,confirmed,cancelled',
            'total_price' => 'required|numeric|min:0',
            'passenger_ids' => 'required|array',
            'passenger_ids.*' => 'exists:passengers,id',
        ]);

        $booking = Booking::create([
            'user_id' => $validated['user_id'],
            'flight_id' => $validated['flight_id'],
            'status' => $validated['status'],
            'total_price' => $validated['total_price'],
            'booking_reference' => strtoupper(substr(md5(uniqid()), 0, 8)), // Generate unique reference
        ]);

        $booking->passengers()->attach($validated['passenger_ids']);

        return redirect()->route('bookings.index')->with('success', 'Booking created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        $booking->load(['user', 'flight.departureAirport', 'flight.arrivalAirport', 'passengers']);

        return Inertia::render('Bookings/Show', [
            'booking' => $booking,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Booking $booking)
    {
        $booking->load(['user', 'flight.departureAirport', 'flight.arrivalAirport', 'passengers']);
        $flights = Flight::with(['departureAirport', 'arrivalAirport'])
            ->where('departure_time', '>', now())
            ->orderBy('departure_time')
            ->get();
        $users = User::orderBy('name')->get();
        $passengers = Passenger::orderBy('last_name')->get();
        
        return Inertia::render('Bookings/Edit', [
            'booking' => $booking,
            'flights' => $flights,
            'users' => $users,
            'passengers' => $passengers,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'flight_id' => 'required|exists:flights,id',
            'status' => 'required|in:pending,confirmed,cancelled',
            'total_price' => 'required|numeric|min:0',
            'passenger_ids' => 'required|array',
            'passenger_ids.*' => 'exists:passengers,id',
        ]);

        $booking->update([
            'user_id' => $validated['user_id'],
            'flight_id' => $validated['flight_id'],
            'status' => $validated['status'],
            'total_price' => $validated['total_price'],
        ]);

        $booking->passengers()->sync($validated['passenger_ids']);

        return redirect()->route('bookings.index')->with('success', 'Booking updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        $booking->delete();

        return redirect()->route('bookings.index')->with('success', 'Booking deleted successfully.');
    }
}
