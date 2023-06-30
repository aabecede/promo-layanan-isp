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
        'CLOSING'
    ];



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
