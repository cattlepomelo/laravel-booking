<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Flight;
use App\Models\Booking;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'flight_id' => Flight::factory(),
            'booking_reference' => strtoupper(fake()->bothify('????-####')),
            'status' => fake()->randomElement(['confirmed', 'pending', 'cancelled']),
            'total_price' => fake()->randomFloat(2, 200, 1500),
            'booking_date' => fake()->dateTimeBetween('-1 month', 'now'),
        ];
    }
}