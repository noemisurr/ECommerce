<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'address';
    protected $fillable = [
        'id',
        'flat',
        'address',
        'city',
        'cap',
        'region',
        'other',
        'default',
        'id_user'
    ];

}
