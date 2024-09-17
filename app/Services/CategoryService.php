<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Support\Facades\DB;

class CategoryService
{
    public function create(array $data): Category
    {
        return DB::transaction(function () use ($data) {
            $category = Category::create($data);

            if (array_key_exists('products', $data)) {
                $category->products()->sync($data['products']);
            }

            if (array_key_exists('parent_category', $data)) {
                $category->parentCategory()->associate($data['parent_category']);
                $category->save();
            }

            return $category;
        });
    }

    public function update(array $data, string $id): Category
    {
        return DB::transaction(function () use ($data, $id) {
            $category = Category::findOrFail($id);

            $category->update($data);

            if (array_key_exists('products', $data)) {
                $category->products()->sync($data['products']);
            }

            if (array_key_exists('parent_category', $data)) {
                $category->parentCategory()->associate($data['parent_category']);
                $category->save();
            }

            return $category;
        });
    }
}
