<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use App\Models\Variation;
use App\Models\Review;
use App\Models\Category;
use App\Models\SubCategory;

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
        'brand',
        'material',
        'size',
        'other',
        'deleted',
        'created_at',
        'id_category',
        'id_subcategory'
    ];
    protected $appends = ['star', 'category_name', 'subcategory_name'];

    public function variations() {
        return $this->hasMany(Variation::class, 'id_product', 'id');
    }

    public function stars() {
        return $this->hasMany(Review::class, 'id_product', 'id');
    }

    public function cat() {
        return $this->hasMany(Category::class, 'id', 'id_category');
    }

    public function sub() {
        return $this->hasMany(SubCategory::class, 'id', 'id_subcategory');
    }

    protected function star(): Attribute
    {
        return new Attribute(
            get: function() {
                $star = $this->stars()->get()->pluck('star')->transform(function($res) {
                    return (int)$res;
                })->avg();
                return $star;
            }
        );
    }

    protected function categoryName(): Attribute
    {
        return new Attribute(
            get: fn () =>  $this->cat()->get()->pluck('name')->pop(),
        );
    }

    protected function subcategoryName(): Attribute
    {
        return new Attribute(
            get: fn () =>  $this->sub()->get()->pluck('name')->pop(),
        );
    }
}
