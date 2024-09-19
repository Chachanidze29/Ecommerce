<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'enabled' => 'required|boolean',
            'categories' => 'required|array',
            'name' => 'required|string|max:255',
            'sku' => 'nullable|string|max:500',
            'description' => 'nullable|string|max:500',
            'images' => 'array',
            'images.*' => 'image|mimes:jpeg,png,jpg|max:2048',
            'price' => 'nullable|numeric',
        ];
    }
}
