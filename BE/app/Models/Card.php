<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'card';
    protected $fillable = [
        'id',
        'owner',
        'number',
        'expiry',
        'cvc',
        'default',
        'id_user',
    ];
}
