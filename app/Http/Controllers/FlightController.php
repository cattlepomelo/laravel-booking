<?php

namespace App\Http\Controllers;

use App\Models\Flight;
use App\Models\Airport;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FlightController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $flights = Flight::with(['departureAirport', 'arrivalAirport'])
            ->when($request->search, function ($query, $search) {
                $query->where('flight_number', 'like', "%{$search}%")
                      ->orWhereHas('departureAirport', function ($q) use ($search) {
                          $q->where('name', 'like', "%{$search}%");
                      })
                      ->orWhereHas('arrivalAirport', function ($q) use ($search) {
                          $q->where('name', 'like', "%{$search}%");
                      });
            })
            ->orderBy('departure_time')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Flights/Index', [
            'flights' => $flights,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $airports = Airport::orderBy('name')->get();
        
        return Inertia::render('Flights/Create', [
            'airports' => $airports,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'flight_number' => 'required|string|max:255',
            'departure_airport_id' => 'required|exists:airports,id',
            'arrival_airport_id' => 'required|exists:airports,id|different:departure_airport_id',
            'departure_time' => 'required|date',
            'arrival_time' => 'required|date|after:departure_time',
            'aircraft_type' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
        ]);

        Flight::create($validated);

        return redirect()->route('flights.index')->with('success', 'Flight created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Flight $flight)
    {
        $flight->load(['departureAirport', 'arrivalAirport']);

        return Inertia::render('Flights/Show', [
            'flight' => $flight,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Flight $flight)
    {
        $flight->load(['departureAirport', 'arrivalAirport']);
        $airports = Airport::orderBy('name')->get();
        
        return Inertia::render('Flights/Edit', [
            'flight' => $flight,
            'airports' => $airports,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Flight $flight)
    {
        $validated = $request->validate([
            'flight_number' => 'required|string|max:255',
            'departure_airport_id' => 'required|exists:airports,id',
            'arrival_airport_id' => 'required|exists:airports,id|different:departure_airport_id',
            'departure_time' => 'required|date',
            'arrival_time' => 'required|date|after:departure_time',
            'aircraft_type' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
        ]);

        $flight->update($validated);

        return redirect()->route('flights.index')->with('success', 'Flight updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Flight $flight)
    {
        $flight->delete();

        return redirect()->route('flights.index')->with('success', 'Flight deleted successfully.');
    }
}
