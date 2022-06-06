<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    public $timestamps = false;
    //TODO: aggiungere timestamp? per vedere le nuove categorie

    protected $table = 'category';
    protected $fillable = [
        'id',
        'name'
    ];
}
