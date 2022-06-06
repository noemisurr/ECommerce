<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    public $timestamps = ["created_at"];
    const UPDATED_AT = null;

    protected $table = 'product';
    protected $fillable = [
        'id',
        'name',
        'short_description',
        'long_description',
        'price',
        'created_at',
        'id_category'
    ];
}
