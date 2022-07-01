<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use App\Models\HomePositionModel;

class SettingsHome extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'settings_home';
    protected $fillable = [
        'id',
        'name',
        'url',
        'alt',
        'size',
        'id_position'
    ];
    protected $appends = [
        'position_name'
    ];

    public function home() {
        return $this->hasMany(HomePositionModel::class, 'id', 'id_position');
    }

    protected function positionName(): Attribute
    {
        return new Attribute(
            get: fn () =>  $this->home()->get()->pluck('name')->pop(),
        );
    }
}
