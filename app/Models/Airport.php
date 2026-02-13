<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Flight;

class Airport extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'city',
        'country',
        'timezone',
        'image_url',
    ];

    public function departingFlights()
    {
        return $this->hasMany(Flight::class, 'departure_airport_id');
    }

    public function arrivingFlights()
    {
        return $this->hasMany(Flight::class, 'arrival_airport_id');
    }
}