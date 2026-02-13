<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Flight;
use App\Models\Passenger;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'flight_id',
        'booking_reference',
        'status',
        'total_price',
        'booking_date',
    ];

    protected $casts = [
        'booking_date' => 'datetime',
        'total_price' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function flight()
    {
        return $this->belongsTo(Flight::class);
    }

    public function passengers()
    {
        return $this->belongsToMany(Passenger::class);
    }
}