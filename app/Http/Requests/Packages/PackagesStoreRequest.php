<?php

namespace App\Http\Requests\Packages;

use App\Models\Packages;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PackagesStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        // dd($this->all());
        return [
            'name' => 'required',
            'description' => 'required',
            'price' => 'required',
            'bandwith' => 'required',
            'kuota' => 'required',
            'upload_download' => 'required',
            'dynamic' => 'required',
            'modem' => 'required',
            'tv_chanel' => 'required',
            'jumlah_perangkat' => 'required',
            'status' => [
                'required', Rule::in(Packages::$status)
            ]
        ];
    }

    // public function messages(){
    //     return [];
    // }
}
