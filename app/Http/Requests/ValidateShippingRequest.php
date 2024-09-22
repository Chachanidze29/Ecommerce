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
            'email' => 'required|email',
            'billing_same' => 'required|boolean',
            'shipping.first_name' => 'required|string|max:255',
            'shipping.last_name' => 'required|string|max:255',
            'shipping.phone_number' => 'required|string|min:10|max:15',
            'shipping.country' => 'required|string|max:255',
            'shipping.zip_code' => 'required|string|max:10',
            'shipping.city' => 'required|string|max:255',
            'shipping.address' => 'required|string|max:255',
            'billing.first_name' => 'required_if:billing_same,false|nullable|string|max:255',
            'billing.last_name' => 'required_if:billing_same,false|nullable|string|max:255',
            'billing.phone_number' => 'required_if:billing_same,false|nullable|string|min:10|max:15',
            'billing.country' => 'required_if:billing_same,false|nullable|string|max:255',
            'billing.zip_code' => 'required_if:billing_same,false|nullable|string|max:10',
            'billing.city' => 'required_if:billing_same,false|nullable|string|max:255',
            'billing.address' => 'required_if:billing_same,false|nullable|string|max:255',
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
            'email.required' => 'Email is required.',
            'email.email' => 'Please provide a valid email address.',
            'billing_same.required' => 'The billing_same field is required.',
            'billing_same.boolean' => 'The billing_same field must be true or false.',
            'shipping.first_name.required' => 'Shipping first name is required.',
            'shipping.last_name.required' => 'Shipping last name is required.',
            'shipping.phone_number.required' => 'Shipping phone number is required.',
            'shipping.country.required' => 'Shipping country is required.',
            'shipping.zip_code.required' => 'Shipping zip code is required.',
            'shipping.city.required' => 'Shipping city is required.',
            'shipping.address.required' => 'Shipping address is required.',
            'billing.first_name.required_if' => 'Billing first name is required if billing information is different.',
            'billing.last_name.required_if' => 'Billing last name is required if billing information is different.',
            'billing.phone_number.required_if' => 'Billing phone number is required if billing information is different.',
            'billing.country.required_if' => 'Billing country is required if billing information is different.',
            'billing.zip_code.required_if' => 'Billing zip code is required if billing information is different.',
            'billing.city.required_if' => 'Billing city is required if billing information is different.',
            'billing.address.required_if' => 'Billing address is required if billing information is different.',
        ];
    }
}
