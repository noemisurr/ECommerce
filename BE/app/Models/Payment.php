<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'payment';
    protected $fillable = [
        'id',
        'total',
        'id_user',
        'id_card',
        'id_order'
    ];
}
