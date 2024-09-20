<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductService
{
    public function create(array $data): Product
    {
        return DB::transaction(function () use ($data) {
            $product = Product::create($data);
            $product->categories()->sync($data['categories']);

            foreach ($data['images'] as $image) {
                $file = $image['path'];
                $path = $file->store('products', 'public');
                $image['path'] = $path;
                $product->images()->create($image);
            }

            return $product;
        });
    }

    public function update(array $data, string $id): Product {
        return DB::transaction(function () use ($data, $id) {
            $product = Product::findOrFail($id);

            $product->update($data);

            if (array_key_exists('categories', $data)) {
                $product->categories()->sync($data['categories']);
            }

            if (isset($data['images']) && is_array($data['images'])) {
                $existingImages = $product->images->pluck('path')->toArray();

                $newImagePaths = [];
                $newImages = [];

                foreach ($data['images'] as $image) {
                    $imgPath = $image['path'];
                    if (is_file($imgPath)) {
                        $path = $imgPath->store('products', 'public');
                        $image['path'] = $path;
                        $newImagePaths[] = $path;
                    } else {
                        $newImagePaths[] = $imgPath;
                    }
                    $newImages[] = $image;
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
