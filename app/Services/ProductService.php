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
            $this->syncImages($product, $data['images']);

            return $product;
        });
    }

    public function update(array $data, string $id): Product
    {
        return DB::transaction(function () use ($data, $id) {
            $product = Product::findOrFail($id);

            $product->update($data);

            if (isset($data['categories'])) {
                $product->categories()->sync($data['categories']);
            }

            if (isset($data['images'])) {
                $this->syncImages($product, $data['images'], true);
            }

            return $product;
        });
    }

    protected function syncImages(Product $product, array $images, bool $isUpdate = false): void
    {
        if ($isUpdate) {
            $this->deleteOldImages($product, $images);
        }

        $newImages = array_map(function ($image) {
            if (is_file($image['path'])) {
                $image['path'] = $image['path']->store('products', 'public');
            }
            return $image;
        }, $images);

        $product->images()->delete();
        $product->images()->createMany($newImages);
    }

    protected function deleteOldImages(Product $product, array $newImages): void
    {
        $existingPaths = $product->images->pluck('path')->toArray();
        $newPaths = array_column($newImages, 'path');

        $pathsToDelete = array_diff($existingPaths, $newPaths);

        foreach ($pathsToDelete as $path) {
            Storage::disk('public')->delete($path);
            $product->images()->where('path', $path)->delete();
        }
    }
}
