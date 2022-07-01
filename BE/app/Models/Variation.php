<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use App\Models\Img;
use App\Models\VariationTag;
use App\Models\Product;
use App\Models\Discount;
use DB;

class Variation extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'variation';
    protected $fillable = [
        'id',
        'name',
        'created_at',
        'id_color',
        'id_product',
        'id_discount'
    ];
    protected $appends = [
        'media',
        'tag_names',
        'price',
        'discount',
        'discounted_price'
    ];

    public function imgs() {
        return $this->hasMany(Img::class, 'id_variation', 'id');
    }

    public function tags() {
        return $this->hasMany(VariationTag::class, 'id_variation', 'id');
    }

    public function totalPrice() {
        return $this->hasOne(Product::class, 'id', 'id_product');
    }

    public function discountInfo() {
        return $this->hasOne(Discount::class, 'id', 'id_discount');
    }

    protected function media(): Attribute
    {
        return new Attribute(
            get: fn () => $this->imgs()->get(),
        );
    }

    protected function tagNames(): Attribute
    {
        return new Attribute(
            get: fn () =>  $this->tags()->get()->pluck('tag_names'),
        );
    }

    protected function price(): Attribute
    {
        return new Attribute(
            get: fn () =>  $this->totalPrice()->get()->pluck('price')->pop(),
        );
    }

    protected function discount(): Attribute
    {
        return new Attribute(
            get: fn () =>  $this->discountInfo()->get()->pluck('value')->pop(),
        );
    }

    protected function discountedPrice(): Attribute {
        return new Attribute(
            get: fn () => $this->price - ($this->price * $this->discount / 100),
        );
    }
}
