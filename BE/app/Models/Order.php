<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use App\Models\OrderItem;
use App\Models\Address;
use App\Models\User;
use App\Models\Payment;

class Order extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'order_detail';
    protected $fillable = [
        'id',
        'total',
        'delivery_date',
        'shipping_date',
        'shipping_code',
        'id_user',
        'id_address'
    ];
    protected $appends = ['variations', 'address', 'payment'];

    public function user() {
        return $this->hasOne(User::class, 'id', 'id_user');
    }

    public function orderItems() {
        return $this->hasMany(OrderItem::class, 'id_order_detail', 'id');
    }

    public function shippingAddress() {
        return $this->hasMany(Address::class, 'id', 'id_address');
    }

    public function paymentMethod() {
        return $this->hasMany(Payment::class, 'id_order', 'id');
    }

    protected function variations(): Attribute
    {
        return new Attribute(
            get: fn () => $this->orderItems()->get(),
        );
    }

    protected function address(): Attribute
    {
        return new Attribute(
            get: fn () => $this->shippingAddress()->get()->first(),
        );
    }

    protected function payment(): Attribute
    {
        return new Attribute(
            get: fn () => $this->paymentMethod()->get()->first(),
        );
    }
}
