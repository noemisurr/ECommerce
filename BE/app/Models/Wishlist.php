<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Variation;

class Wishlist extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'wishlist';
    protected $fillable = [
        'id',
        'id_user',
        'id_variation'
    ];

    public function variation() {
        return $this->hasOne(Variation::class, 'id', 'id_variation');
    }

}
