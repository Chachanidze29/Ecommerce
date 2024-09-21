<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class CategoryService
{
    public function getCategoryByName(string $categoryName)
    {
        return Category::where('name', $categoryName)
            ->firstOrFail();
    }

    public function getParentCategories(): Collection
    {
        return Category::with(['subCategories', 'parentCategory'])->whereNull('parent_id')->get();
    }

    public function getCategoryProducts(string $categoryName) {
        $category = Category::where('name', $categoryName)
            ->with([
                'products' => function ($query) {
                    $query->with(['images' => function ($query) {
                        $query->whereIn('type', ['Thumbnail', 'Hover']);
                    }]);
                },
                'subCategories.products' => function ($query) {
                    $query->with(['images' => function ($query) {
                        $query->whereIn('type', ['Thumbnail', 'Hover']);
                    }]);
                },
                'parentCategory'
            ])
            ->firstOrFail();

        return $category->products->merge(
            $category->subCategories->flatMap(function ($subCategory) {
                return $subCategory->products;
            })
        );
    }

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
