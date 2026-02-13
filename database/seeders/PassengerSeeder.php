<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Passenger;

class PassengerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample passengers using factory
        Passenger::factory(150)->create();
    }
}