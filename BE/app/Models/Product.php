<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use App\Models\Variation;
use App\Models\Review;

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
    protected $appends = ['star'];

    public function variations() {
        return $this->hasMany(Variation::class, 'id_product', 'id');
    }

    public function stars() {
        return $this->hasMany(Review::class, 'id_product', 'id');
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
}
