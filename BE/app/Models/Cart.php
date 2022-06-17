<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use App\Models\CartItem;

class Cart extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'cart';
    protected $fillable = [
        'id',
        'total',
        'id_user'
    ];
    protected $appends = ['items'];

    public function item() {
        return $this->hasMany(CartItem::class, 'id_cart', 'id');
    }

    protected function items(): Attribute
    {
        return new Attribute(
            get: fn () => $this->item()->get(),
        );
    }
}
