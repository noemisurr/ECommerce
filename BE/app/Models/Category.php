<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\SubCategory;
use App\Models\Product;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Category extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'product_category';
    protected $fillable = [
        'id',
        'name',
        'title',
        'description'
    ];

    protected $appends = ['subcategories', 'n_products'];

    public function sub() {
        return $this->hasMany(SubCategory::class, 'id_category', 'id');
    }
    public function products() {
        return $this->hasMany(Product::class, 'id_category', 'id');
    }

    protected function subcategories(): Attribute
    {
        return new Attribute(
            get: fn () =>  $this->sub()->get(),
        );
    }
    protected function nProducts(): Attribute
    {
        return new Attribute(
            get: fn () =>  $this->products()->get()->count(),
        );
    }
}
