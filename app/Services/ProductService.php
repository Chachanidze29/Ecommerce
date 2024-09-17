<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

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

            if (array_key_exists('thumbnail', $data) && $data['thumbnail'] instanceof UploadedFile) {
                $path = $data['thumbnail']->store('products', 'public');
                $data['thumbnail'] = $path;
            }

            $product->update($data);

            if (array_key_exists('categories', $data)) {
                $product->categories()->sync($data['categories']);
            }

            if (isset($data['images']) && is_array($data['images'])) {
                foreach ($data['images'] as $image) {
                    $path = $image->store('products', 'public');
                    $product->images()->create(['path' => $path]);
                }
            }

            return $product;
        });
    }
}
