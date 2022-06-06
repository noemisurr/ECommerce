<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HomePositionModel extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'home_position';
    protected $fillable = [
        'id',
        'name'
    ];
}
