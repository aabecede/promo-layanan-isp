<?php

namespace App\Models;

use App\Http\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Promo extends Model
{
    use CrudTrait;
    use HasFactory;
    use SoftDeletes;

    protected $table = 'promo';
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



    /** Relation
     * do your code
    */

    /** Attribute
     * do your code
    */
}
