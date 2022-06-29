<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use App\Models\Variation;
use App\Models\Discount;

class OrderItem extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'item_order_detail';
    protected $fillable = [
        'id',
        'quantity',
        'id_variation',
        'id_order_detail',
        'id_discount'
    ];
    protected $appends = ['variation'];

    public function variations() {
        return $this->hasOne(Variation::class, 'id', 'id_variation');
    }

    protected function variation(): Attribute
    {
        return new Attribute(
            get: fn () => $this->variations()->get()->pop(),
        );
    }
}
