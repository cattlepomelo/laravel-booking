<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Airport>
 */
class AirportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $cities = [
            'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 
            'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
            'London', 'Paris', 'Rome', 'Madrid', 'Berlin', 'Amsterdam',
            'Tokyo', 'Seoul', 'Beijing', 'Shanghai', 'Bangkok', 'Singapore',
            'Sydney', 'Melbourne', 'Auckland', 'Wellington',
            'Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa',
            'São Paulo', 'Rio de Janeiro', 'Buenos Aires', 'Lima', 'Bogotá',
            'Cairo', 'Cape Town', 'Lagos', 'Nairobi', 'Casablanca',
            'Dubai', 'Abu Dhabi', 'Doha', 'Riyadh', 'Jeddah'
        ];
        
        $countries = [
            'United States', 'United Kingdom', 'France', 'Italy', 'Spain', 
            'Germany', 'Netherlands', 'Japan', 'South Korea', 'China',
            'Australia', 'Canada', 'Brazil', 'Argentina', 'Egypt',
            'South Africa', 'UAE', 'Saudi Arabia', 'Singapore', 'Thailand'
        ];

        return [
            'name' => fake()->randomElement($cities) . ' International Airport',
            'code' => strtoupper(fake()->unique()->bothify('???###')),
            'city' => fake()->randomElement($cities),
            'country' => fake()->randomElement($countries),
            'timezone' => fake()->timezone(),
            'image_url' => fake()->randomElement([
                'https://images.unsplash.com/photo-1534073784821-3886a64ce3cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1503264116251-35a269799033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1581044793557-03fa8a13e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1571068316344-75bc76a6d033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1566371895418-85304baa130d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            ]),
        ];
    }
}