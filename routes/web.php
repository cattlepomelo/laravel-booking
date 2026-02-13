<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    $stats = [
        'flightsCount' => \App\Models\Flight::count(),
        'activeBookingsCount' => \App\Models\Booking::whereIn('status', ['pending', 'confirmed'])->count(),
        'passengersCount' => \App\Models\Passenger::count(),
        'destinationsCount' => \App\Models\Airport::count(),
    ];
    
    return Inertia::render('dashboard', $stats);
})->middleware(['auth', 'verified'])->name('dashboard');

// Flight routes
Route::resource('flights', \App\Http\Controllers\FlightController::class)->middleware(['auth', 'verified']);

// Booking routes
Route::resource('bookings', \App\Http\Controllers\BookingController::class)->middleware(['auth', 'verified']);

// Flight booking routes
Route::get('/book-flight', [\App\Http\Controllers\FlightBookingController::class, 'index'])->middleware(['auth', 'verified'])->name('flight-booking.index');
Route::post('/book-flight/search', [\App\Http\Controllers\FlightBookingController::class, 'search'])->middleware(['auth', 'verified'])->name('flight-booking.search');
Route::get('/book-flight/confirm', [\App\Http\Controllers\FlightBookingController::class, 'showBookingForm'])->middleware(['auth', 'verified'])->name('flight-booking.confirm-form');
Route::post('/book-flight', [\App\Http\Controllers\FlightBookingController::class, 'store'])->middleware(['auth', 'verified'])->name('flight-booking.store');
Route::get('/book-flight/confirmation/{id}', [\App\Http\Controllers\FlightBookingController::class, 'showBookingConfirmation'])->middleware(['auth', 'verified'])->name('flight-booking.confirmation');

require __DIR__.'/settings.php';
