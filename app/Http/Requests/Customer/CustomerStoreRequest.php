<?php

namespace App\Http\Requests\Customer;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CustomerStoreRequest extends FormRequest
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
        $rules = [
            'name' => 'required',
            'address' => 'required',
            'phone' => [
                'required',
                Rule::unique('customer', 'phone')
                    ->ignore($this->customer, 'id')
                    ->whereNull('deleted_at')
            ],
            'metode_ketemu' =>
            ['required', Rule::in(Customer::$metodeKetemu)],
            'status_ketertarikan' =>
            ['required', Rule::in(Customer::$statusKetertarikan)],
            'sales_id' =>
            [
                'required',
                Rule::in(User::where('roles', 'sales')->get()->pluck('id')->toArray())
            ],
        ];
        return $rules;
    }

    // public function messages(){
    //     return [];
    // }
}
