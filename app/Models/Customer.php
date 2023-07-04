<?php

namespace App\Models;

use App\Http\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use CrudTrait;
    use HasFactory;
    use SoftDeletes;

    protected $table = 'customer';
    protected $guarded = ['id'];
    protected $hidden = ['id'];
    //public $incrementing = false;
    //protected $keyType = 'string';
    public function delete()
    {
        parent::update([
            'deleted_at' => now(),
            'deleted_by' => auth()->id(),
        ]);
    }
    public static $metodeKetemu = [
        'SOSMED',
        'KETEMU LANGSUNG'
    ];

    public static $statusKetertarikan = [
        'TERTARIK',
        'RAGU',
        'PROSPEK'
        // 'CLOSING'
    ];

    /**scope */
    public function scopeGetAllData($query){
        if(auth()->user()->roles == 'super-admin'){
            return $query->latest();
        }
        elseif(auth()->user()->roles == 'marketing'){
            $userSales = User::where('created_by', auth()->user()->id)->select('id')->get()->pluck('id')->toArray();
            return $query->where(function($q) use ($userSales){
                $q->whereIn('created_by', $userSales)
                ->orWhere('created_by', auth()->user()->id);
            })->latest();
        }
        elseif (auth()->user()->roles == 'sales') {
            return $query->where('sales_id', auth()->user()->id)->latest();
        }
        return $query;
    }

    /** Relation
     * do your code
    */
    public function sales(){
        return $this->hasOne(User::class, 'id', 'sales_id');
    }

    /** Attribute
     * do your code
    */
}
