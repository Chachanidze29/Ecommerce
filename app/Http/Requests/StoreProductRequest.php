<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\UploadedFile;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

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
            'images' => [
                'required',
                'array',
                function ($attribute, $value, $fail) {
                    $hoverCount = 0;
                    $thumbnailCount = 0;

                    foreach ($value as $index => $image) {
                        if (!isset($image['path']) || !is_file($image['path'])) {
                            return $fail("The {$attribute}.{$index}.path field is required and must be a string.");
                        }

                        if (!($image['path'] instanceof UploadedFile) || !$image['path']->isValid()) {
                            return $fail("The {$attribute}.{$index}.path field must be a valid uploaded image file.");
                        }

                        if (!in_array($image['path']->extension(), ['jpg', 'jpeg', 'png', 'gif'])) {
                            return $fail("The {$attribute}.{$index}.path field must be a valid image (jpg, jpeg, png, gif).");
                        }

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
            'price' => 'nullable|numeric',
        ];
    }

//    public function withValidator(Validator $validator): void
//    {
//        $validator->after(function ($validator) {
//            $images = $this->input('images', []);
//
//            $hoverCount = 0;
//            $thumbnailCount = 0;
//
//            foreach ($images as $image) {
//                if (isset($image['type'])) {
//                    if ($image['type'] === 'hover') {
//                        $hoverCount++;
//                    } elseif ($image['type'] === 'thumbnail') {
//                        $thumbnailCount++;
//                    }
//                }
//            }
//
//            if ($hoverCount !== 1) {
//                $validator->errors()->add('images', 'Select one hover image');
//            }
//
//            if ($thumbnailCount !== 1) {
//                $validator->errors()->add('images', 'Select one thumbnail image');
//            }
//        });
//    }
}
