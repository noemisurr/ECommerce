<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VariationTag extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'variation_tag';
    protected $fillable = [
        'id',
        'id_tag',
        'id_variation'
    ];
    
}
