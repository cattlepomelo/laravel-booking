<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class ResetAndSeedData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:reset-and-seed-data {--force : Force the operation without confirmation}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reset and re-seed the database with fresh seed data';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        if (!$this->option('force') && !$this->confirm('Are you sure you want to reset and re-seed the database? This will delete all existing data.')) {
            $this->info('Operation cancelled.');
            return self::SUCCESS;
        }

        $this->info('Resetting and re-seeding the database...');

        try {
            // Clear all existing data
            Artisan::call('migrate:refresh', [], $this->getOutput());
            
            // Run the seeders
            Artisan::call('db:seed', [], $this->getOutput());
            
            $this->info('Database has been reset and seeded successfully!');
            $this->info('Created:');
            $this->line('- Users: ' . \App\Models\User::count());
            $this->line('- Airports: ' . \App\Models\Airport::count());
            $this->line('- Flights: ' . \App\Models\Flight::count());
            $this->line('- Passengers: ' . \App\Models\Passenger::count());
            $this->line('- Bookings: ' . \App\Models\Booking::count());

            return self::SUCCESS;
        } catch (\Exception $e) {
            $this->error('An error occurred: ' . $e->getMessage());
            return self::FAILURE;
        }
    }
}
