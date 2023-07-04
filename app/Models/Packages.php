<?php

namespace App\Models;

use App\Http\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Packages extends Model
{
    use CrudTrait;
    use HasFactory;
    use SoftDeletes;

    protected $table = 'packages';
    protected $guarded = ['id'];
    protected $hidden = ['id'];
    //public $incrementing = false;
    //protected $keyType = 'string';
    public static $status = [
        'aktif',
        'tidak aktif',
    ];
    public function delete()
    {
        parent::update([
            'deleted_at' => now(),
            'deleted_by' => auth()->id(),
        ]);
    }


    /**scope */
    public function scopeGetAllData($query){
        if(in_array(auth()->user()->roles, ['super-admin', 'marketing'])){
            return $query->latest();
        }
        elseif(auth()->user()->roles == 'sales'){
            return $query->where('status', 'aktif')->latest();
        }
    }
    /** Relation
     * do your code
    */

    /** Attribute
     * do your code
    */
    public function setDynamicAttribute($dynamic){
        $this->attributes['dynamic'] = strtoupper($dynamic);
    }
    public function setModemAttribute($modem){
        $this->attributes['modem'] = strtoupper($modem);
    }
    public function setTvChanelAttribute($tv_chanel){
        $this->attributes['tv_chanel'] = strtoupper($tv_chanel);
    }
    public function setJumlahPerangkatAttribute($jumlah_perangkat){
        $this->attributes['jumlah_perangkat'] = strtoupper($jumlah_perangkat);
    }
}
