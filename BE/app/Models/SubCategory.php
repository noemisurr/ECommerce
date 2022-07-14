<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use Illuminate\Database\Eloquent\Casts\Attribute;

class SubCategory extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'product_sub_category';
    protected $fillable = [
        'id',
        'name',
        'title',
        'description',
        'id_category'
    ];
    protected $appends = ['category_name', 'n_products'];

    public function category() {
        return $this->hasMany(Category::class, 'id', 'id_category');
    }
    public function products() {
        return $this->hasMany(Product::class, 'id_subcategory', 'id');
    }

    protected function categoryName(): Attribute
    {
        return new Attribute(
            get: fn () =>  $this->category()->get()->pluck('name')->pop(),
        );
    }
    protected function nProducts(): Attribute
    {
        return new Attribute(
            get: fn () =>  $this->products()->get()->count(),
        );
    }
}
