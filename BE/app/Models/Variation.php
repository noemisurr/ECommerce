<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use App\Models\Img;
use App\Models\VariationTag;

class Variation extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'variation';
    protected $fillable = [
        'id',
        'created_at',
        'id_color',
        'id_product',
        'id_discount'
    ];
    protected $appends = [
        'media',
        'tag'
    ];

    public function imgs() {
        return $this->hasMany(Img::class, 'id_variation', 'id');
    }

    public function tags() {
        return $this->hasMany(VariationTag::class, 'id_variation', 'id');
    }

    protected function media(): Attribute
    {
        return new Attribute(
            get: fn () => $this->imgs()->get(),
        );
    }

    protected function tag(): Attribute
    {
        return new Attribute(
            get: fn () =>  $this->tags()->get(),
        );
    }


}
