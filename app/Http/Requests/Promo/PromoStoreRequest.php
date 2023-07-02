<?php

namespace App\Http\Requests\Promo;

use Illuminate\Foundation\Http\FormRequest;

class PromoStoreRequest extends FormRequest
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
        // dd($this);
        $rules =
        [
            'title' => 'required',
            'start_date' => ['required', 'date'],
            'end_date' => [
                'required',
                'date',
                'after:' . $this->start_date
            ],
            'image' => 'required|mimes:png,jpg,jpeg,gif',
        ];
        if(!empty($this->promo)){
            unset($rules['image']);
            if(!empty($this->file('image'))){
                $rules['image'] = 'mimes:png,jpg,jpeg,gif';
            }
        }
        return $rules;
    }

    // public function messages(){
    //     return [];
    // }
}
