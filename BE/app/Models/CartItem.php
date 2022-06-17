<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use App\Models\Variation;

class CartItem extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'cart_item';
    protected $fillable = [
        'id',
        'quantity',
        'id_cart',
        'id_variation'
    ];
    protected $appends = ['variations'];

    public function variation() {
        return $this->hasMany(Variation::class, 'id', 'id_variation');
    }

    protected function variations(): Attribute
    {
        return new Attribute(
            get: fn () => $this->variation()->get(),
        );
    }
}
