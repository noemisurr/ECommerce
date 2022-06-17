<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Review extends Model
{
    use HasFactory;
    public $timestamps = ["created_at"];
    const UPDATED_AT = null;

    protected $table = 'review';
    protected $fillable = [
        'title',
        'text',
        'star',
        'created_at',
        'id_user',
        'id_product'
    ];

    public function user() {
        return $this->hasMany(User::class, 'id', 'id_user');
    }
}
