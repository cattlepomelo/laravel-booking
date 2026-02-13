<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Airport;

class AirportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create some realistic major airports
        $airports = [
            [
                'name' => 'John F. Kennedy International Airport',
                'code' => 'JFK',
                'city' => 'New York',
                'country' => 'United States',
                'timezone' => 'America/New_York',
                'image_url' => 'https://images.unsplash.com/photo-1534073784821-3886a64ce3cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            [
                'name' => 'Los Angeles International Airport',
                'code' => 'LAX',
                'city' => 'Los Angeles',
                'country' => 'United States',
                'timezone' => 'America/Los_Angeles',
                'image_url' => 'https://images.unsplash.com/photo-1503264116251-35a269799033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            [
                'name' => 'London Heathrow Airport',
                'code' => 'LHR',
                'city' => 'London',
                'country' => 'United Kingdom',
                'timezone' => 'Europe/London',
                'image_url' => 'https://images.unsplash.com/photo-1581044793557-03fa8a13e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            [
                'name' => 'Tokyo Haneda Airport',
                'code' => 'HND',
                'city' => 'Tokyo',
                'country' => 'Japan',
                'timezone' => 'Asia/Tokyo',
                'image_url' => 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            [
                'name' => 'Dubai International Airport',
                'code' => 'DXB',
                'city' => 'Dubai',
                'country' => 'UAE',
                'timezone' => 'Asia/Dubai',
                'image_url' => 'https://images.unsplash.com/photo-1571068316344-75bc76a6d033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            [
                'name' => 'Sydney Kingsford Smith Airport',
                'code' => 'SYD',
                'city' => 'Sydney',
                'country' => 'Australia',
                'timezone' => 'Australia/Sydney',
                'image_url' => 'https://imgs.search.brave.com/eIRep3-JpbxHFuT6kclEYi_vHzbsLsxGWsM9yp6IWro/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/MjM0ODI1ODA2NzIt/ZjEwOWJhOGNiOWJl/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZhdXRv/PWZvcm1hdCZmaXQ9/Y3JvcCZpeGxpYj1y/Yi00LjEuMCZpeGlk/PU0zd3hNakEzZkRC/OE1IeHpaV0Z5WTJo/OE1URjhmSE41Wkc1/bGVTVXlNSE5yZVd4/cGJtVjhaVzU4TUh4/OE1IeDhmREE9'
            ],
            [
                'name' => 'Charles de Gaulle Airport',
                'code' => 'CDG',
                'city' => 'Paris',
                'country' => 'France',
                'timezone' => 'Europe/Paris',
                'image_url' => 'https://media.gettyimages.com/id/1695294699/photo/street-in-paris-with-eiffel-tower-france.jpg?s=612x612&w=0&k=20&c=Ong0p-LdZAO-lT_fZFNrFTwI4pNkRaSdP1clwcvGIu4='
            ],
            [
                'name' => 'Frankfurt Airport',
                'code' => 'FRA',
                'city' => 'Frankfurt',
                'country' => 'Germany',
                'timezone' => 'Europe/Berlin',
                'image_url' => 'https://images.unsplash.com/photo-1583160247711-219ee94a35b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            [
                'name' => 'Singapore Changi Airport',
                'code' => 'SIN',
                'city' => 'Singapore',
                'country' => 'Singapore',
                'timezone' => 'Asia/Singapore',
                'image_url' => 'https://images.unsplash.com/photo-1571068316344-75bc76a6d033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            [
                'name' => 'Toronto Pearson International Airport',
                'code' => 'YYZ',
                'city' => 'Toronto',
                'country' => 'Canada',
                'timezone' => 'America/Toronto',
                'image_url' => 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            [
                'name' => 'Beijing Capital International Airport',
                'code' => 'PEK',
                'city' => 'Beijing',
                'country' => 'China',
                'timezone' => 'Asia/Shanghai',
                'image_url' => 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            [
                'name' => 'Hong Kong International Airport',
                'code' => 'HKG',
                'city' => 'Hong Kong',
                'country' => 'China',
                'timezone' => 'Asia/Hong_Kong',
                'image_url' => 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            [
                'name' => 'São Paulo-Guarulhos International Airport',
                'code' => 'GRU',
                'city' => 'São Paulo',
                'country' => 'Brazil',
                'timezone' => 'America/Sao_Paulo',
                'image_url' => 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            [
                'name' => 'Cairo International Airport',
                'code' => 'CAI',
                'city' => 'Cairo',
                'country' => 'Egypt',
                'timezone' => 'Africa/Cairo',
                'image_url' => 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            [
                'name' => 'Cape Town International Airport',
                'code' => 'CPT',
                'city' => 'Cape Town',
                'country' => 'South Africa',
                'timezone' => 'Africa/Johannesburg',
                'image_url' => 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]
        ];

        foreach ($airports as $airport) {
            Airport::firstOrCreate(
                ['code' => $airport['code']], 
                $airport
            );
        }

        // Create additional random airports using factory
        Airport::factory(20)->create();
    }
}