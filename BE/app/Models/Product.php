<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Variation;

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
        'deleted',
        'created_at',
        'id_category'
    ];

    public function variations() {
        return $this->hasMany(Variation::class, 'id_product', 'id');
    }
}
