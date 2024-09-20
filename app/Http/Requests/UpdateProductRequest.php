<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            'enabled' => 'boolean',
            'categories' => 'array',
            'name' => 'string|max:255',
            'sku' => 'nullable|string|max:500,unique:products,sku',
            'description' => 'nullable|string|max:500',
            'images' => 'array',
            'images.*' => [
                'nullable',
                function ($attribute, $value, $fail) {
                    if (!is_string($value['path']) && !is_file($value['path'])) {
                        return $fail('The '.$attribute.' must be either a valid image or a string representing the image path.');
                    }
                    if (is_file($value['path'])) {
                        if (!$value->isValid() || !in_array($value->getClientOriginalExtension(), ['jpeg', 'png', 'jpg'])) {
                            return $fail('The ' . $attribute . ' must be a valid image file of type jpeg, png, or jpg.');
                        }
                    }
                },
                'max:2048',
            ],
            'price' => 'nullable|numeric',
        ];
    }
}
