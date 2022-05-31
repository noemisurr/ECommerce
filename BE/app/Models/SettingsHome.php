<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SettingsHome extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'settings_home';
    protected $fillable = [
        'id_position',
        'src',
        'alt',
        'size'
    ];
}
