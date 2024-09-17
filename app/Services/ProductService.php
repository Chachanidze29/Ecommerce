<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductService
{
    public function create(array $data): Product
    {
        return DB::transaction(function () use ($data) {
            if (isset($data['thumbnail']) && $data['thumbnail'] instanceof UploadedFile) {
                $path = $data['thumbnail']->store('products', 'public');
                $data['thumbnail'] = $path;
            }

            $product = Product::create($data);
            $product->categories()->sync($data['categories']);

            if (isset($data['images']) && is_array($data['images'])) {
                foreach ($data['images'] as $image) {
                    $path = $image->store('products', 'public');
                    $product->images()->create(['path' => $path]);
                }
            }

            return $product;
        });
    }

    public function update(array $data, string $id): Product {
        return DB::transaction(function () use ($data, $id) {
            $product = Product::findOrFail($id);

            // Handle thumbnail
            if (array_key_exists('thumbnail', $data) && $data['thumbnail'] instanceof UploadedFile) {
                $path = $data['thumbnail']->store('products', 'public');
                $data['thumbnail'] = $path;
            }

            $product->update($data);

            if (array_key_exists('categories', $data)) {
                $product->categories()->sync($data['categories']);
            }

            if (isset($data['images']) && is_array($data['images'])) {
                $existingImages = $product->images->pluck('path')->toArray();

                $newImagePaths = [];
                $newImages = [];

                foreach ($data['images'] as $image) {
                    if (is_file($image)) {
                        $path = $image->store('products', 'public');
                        $newImagePaths[] = $path;
                        $newImages[] = [
                            'path' => $path,
                            'alt_text' => $product->name
                        ];
                    } else {
                        $newImagePaths[] = $image;
                        $newImages[] = [
                            'path' => $image,
                            'alt_text' => $product->name
                        ];
                    }
                }

                $imagesToDelete = array_diff($existingImages, $newImagePaths);

                foreach ($imagesToDelete as $oldImagePath) {
                    Storage::disk('public')->delete($oldImagePath);

                    $product->images()->where('path', $oldImagePath)->delete();
                }

                $product->images()->delete();
                $product->images()->createMany($newImages);
            }

            return $product;
        });
    }
}
