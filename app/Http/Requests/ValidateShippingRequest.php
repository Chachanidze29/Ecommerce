<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ValidateShippingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'email'],
            'shipping_first_name' => ['required', 'string', 'max:255'],
            'shipping_last_name' => ['required', 'string', 'max:255'],
            'shipping_phone_number' => ['required', 'string', 'max:20'],
            'shipping_country' => ['required', 'string', 'max:255'],
            'shipping_zip_code' => ['required', 'numeric'],
            'shipping_city' => ['required', 'string', 'max:255'],
            'shipping_address' => ['required', 'string', 'max:255'],

            'billing_same' => ['required', 'boolean'],
            'billing_first_name' => ['nullable', 'required_if:billing_same,false', 'string', 'max:255'],
            'billing_last_name' => ['nullable', 'required_if:billing_same,false', 'string', 'max:255'],
            'billing_phone_number' => ['nullable', 'required_if:billing_same,false', 'string', 'max:20'],
            'billing_country' => ['nullable', 'required_if:billing_same,false', 'string', 'max:255'],
            'billing_zip_code' => ['nullable', 'required_if:billing_same,false', 'numeric'],
            'billing_city' => ['nullable', 'required_if:billing_same,false', 'string', 'max:255'],
            'billing_address' => ['nullable', 'required_if:billing_same,false', 'string', 'max:255'],
        ];
    }

    /**
     * Customize the error messages for validation failures.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'email.required' => 'The email address is required.',
            'email.email' => 'Please provide a valid email address.',
            'shipping_first_name.required' => 'First name is required.',
            'shipping_last_name.required' => 'Last name is required.',
            'shipping_phone_number.required' => 'Phone number is required.',
            'shipping_country.required' => 'Country is required.',
            'shipping_zip_code.required' => 'Zip code is required.',
            'shipping_city.required' => 'City is required.',
            'shipping_address.required' => 'Address is required.',
            'billing_first_name.required_if' => 'First name is required when billing information is different.',
            'billing_last_name.required_if' => 'Last name is required when billing information is different.',
            'billing_phone_number.required_if' => 'Phone number is required when billing information is different.',
            'billing_country.required_if' => 'Country is required when billing information is different.',
            'billing_zip_code.required_if' => 'Zip code is required when billing information is different.',
            'billing_city.required_if' => 'City is required when billing information is different.',
            'billing_address.required_if' => 'Address is required when billing information is different.',
        ];
    }
}
