<?php

namespace App\Models;

use App\Http\Traits\CrudTrait;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, CrudTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = ['id'];

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
    public static $roles = [
        'super-admin' => [
            'super-admin',
            'marketing',
            'sales'
        ],
        'marketing' => ['sales'],
    ];


    /**scope */
    public function scopeGetAllUser($query){
        if(auth()->user()->roles == 'super-admin'){
            return $query->latest();
        }
        elseif(auth()->user()->roles == 'marketing'){
            return $query->where('created_by', auth()->user()->id);
        }
    }

    public function scopeGetSalesUser($query){
        $query = $query->where('roles', 'sales');
        if(auth()->user()->roles == 'super-admin'){
            return $query;
        }
        else if(auth()->user()->roles == 'marketing'){
            return $query->where('created_by', auth()->user()->id);
        }
    }
    /**relasi */
    /**attribute */
    public function setPasswordAttribute($password) {
        $this->attributes['password'] = bcrypt($password);
    }
}
