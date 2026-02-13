<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Airport;
use App\Models\Flight;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Flight>
 */
class FlightFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $departureTime = fake()->dateTimeBetween('+1 day', '+3 months');
        $duration = fake()->numberBetween(60, 720); // Duration in minutes (1 hour to 12 hours)
        $arrivalTime = clone $departureTime;
        $arrivalTime->modify("+$duration minutes");

        return [
            'flight_number' => fake()->bothify('??###'),
            'departure_airport_id' => Airport::factory(),
            'arrival_airport_id' => Airport::factory(),
            'departure_time' => $departureTime,
            'arrival_time' => $arrivalTime,
            'aircraft_type' => fake()->randomElement(['Boeing 737', 'Airbus A320', 'Boeing 777', 'Airbus A350', 'Embraer E195']),
            'capacity' => fake()->numberBetween(100, 400),
            'price' => fake()->randomFloat(2, 100, 2000),
        ];
    }
}