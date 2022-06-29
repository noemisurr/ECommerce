<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use App\Models\Tag;

class VariationTag extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'variation_tag';
    protected $fillable = [
        'id',
        'id_tag',
        'id_variation'
    ];
    protected $appends = [
        'tag_names'
    ];

    public function tag()
    {
        return $this->hasOne(Tag::class, 'id', 'id_tag');
    }

    public function tagNames(): Attribute
    {
        return new Attribute(
            get: fn () =>  $this->tag()->get()->pluck('name')->pop(),
        );
    }

    
}
