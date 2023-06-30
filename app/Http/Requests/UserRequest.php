<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserRequest extends FormRequest
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
        return [
            'email' => ['required', 'unique:users,email,' . optional($this->user)->id,],
            'username' => ['required', 'unique:users,username,' . optional($this->user)->id,],
            'name' => ['required'],
            'password' => (empty($this->user->password)) ? ['required', Password::defaults()] : '',
            'roles' => [
                'required',
                Rule::in(User::$roles),
            ]
            // 'address' => ['required'],
        ];
    }
}
