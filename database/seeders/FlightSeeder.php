<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Flight;
use App\Models\Airport;

class FlightSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create some sample airports first if they don't exist
        if (Airport::count() == 0) {
            $this->call(AirportSeeder::class);
        }

        // Get airport IDs for creating flights
        $airports = Airport::all();
        
        if ($airports->count() >= 2) {
            $airportIds = $airports->pluck('id')->toArray();
            
            // Create sample flights
            Flight::factory(50)->create([
                'departure_airport_id' => $airportIds[array_rand($airportIds)],
                'arrival_airport_id' => $airportIds[array_rand($airportIds)]
            ])->each(function ($flight) use ($airportIds) {
                // Ensure departure and arrival airports are different
                if ($flight->departure_airport_id === $flight->arrival_airport_id) {
                    $otherAirports = array_filter($airportIds, function ($id) use ($flight) {
                        return $id !== $flight->departure_airport_id;
                    });
                    
                    if (!empty($otherAirports)) {
                        $flight->update([
                            'arrival_airport_id' => $otherAirports[array_rand($otherAirports)]
                        ]);
                    }
                }
            });
        } else {
            // If not enough airports, create flights with random airports
            Flight::factory(50)->create();
        }
    }
}