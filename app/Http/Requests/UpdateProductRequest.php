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
            'images' => [
                'array',
                function ($attribute, $value, $fail) {
                    $hoverCount = 0;
                    $thumbnailCount = 0;

                    foreach ($value as $image) {
                        if ($image['type'] === 'Hover') {
                            $hoverCount++;
                        }

                        if ($image['type'] === 'Thumbnail') {
                            $thumbnailCount++;
                        }
                    }

                    if ($hoverCount !== 1) {
                        return $fail("There should be one image with type 'Hover'.");
                    }

                    if ($thumbnailCount !== 1) {
                        return $fail("There should be one image with type 'Thumbnail'.");
                    }
                }
            ],
            'images.*' => [
                'nullable',
                function ($attribute, $value, $fail) {
                    $path = $value['path'];
                    if (!is_string($path) && !is_file($path)) {
                        return $fail('The ' . $attribute . ' must be either a valid image or a string representing the image path.');
                    }
                    if (is_file($path)) {
                        if (!$path->isValid() || !in_array($path->getClientOriginalExtension(), ['jpeg', 'png', 'jpg'])) {
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
