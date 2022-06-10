<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Img extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'img';
    protected $fillable = [
        'id',
        'url',
        'description',
        'id_variation'
    ];
}
