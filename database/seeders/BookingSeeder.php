<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Booking;
use App\Models\User;
use App\Models\Flight;
use App\Models\Passenger;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create users if none exist
        if (User::count() == 0) {
            $this->call(DatabaseSeeder::class); // This will create the default user
        }

        // Create flights if none exist
        if (Flight::count() == 0) {
            $this->call(FlightSeeder::class);
        }

        // Create passengers if none exist
        if (Passenger::count() == 0) {
            $this->call(PassengerSeeder::class);
        }

        // Create sample bookings
        Booking::factory(100)->create()->each(function ($booking) {
            // Attach some passengers to each booking
            $passengers = Passenger::inRandomOrder()->limit(rand(1, 4))->get();
            $booking->passengers()->attach($passengers);
        });
    }
}