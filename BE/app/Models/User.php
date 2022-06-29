<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Address;
use App\Models\Card;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'surname',
        'email',
        'password',
        'telephone',
        'birth',
        'id_user_type',
        'jwt'
    ];
    protected $appends = ['cards', 'address'];

    public function addresses() {
        return $this->hasMany(Address::class, 'id_user', 'id');
    }

    public function card() {
        return $this->hasMany(Card::class, 'id_user', 'id');
    }

    protected function address(): Attribute
    {
        return new Attribute(
            get: fn () => $this->addresses()->get(),
        );
    }

    protected function cards(): Attribute
    {
        return new Attribute(
            get: fn () => $this->card()->get(),
        );
    }


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
