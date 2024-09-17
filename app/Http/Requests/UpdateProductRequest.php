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
            'thumbnail' => [
                'nullable',
                function ($attribute, $value, $fail) {
                    if (!is_string($value) && !is_file($value)) {
                        $fail('The '.$attribute.' must be either a valid image or a string representing the image path.');
                    }
                    if (is_file($value)) {
                        if (!$value->isValid() || !in_array($value->getClientOriginalExtension(), ['jpeg', 'png', 'jpg'])) {
                            $fail('The ' . $attribute . ' must be a valid image file of type jpeg, png, or jpg.');
                        }
                        if ($value->getSize() > 2048 * 1024) {
                            $fail('The ' . $attribute . ' may not be greater than 2MB.');
                        }
                    }
                },
                'max:2048',
            ],
            'price' => 'nullable|numeric',
        ];
    }
}
