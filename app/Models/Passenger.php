<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Booking;

class Passenger extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'date_of_birth',
        'passport_number',
        'nationality',
        'phone',
        'email',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
    ];

    public function bookings()
    {
        return $this->belongsToMany(Booking::class);
    }
}