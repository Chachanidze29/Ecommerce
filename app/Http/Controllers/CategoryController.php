<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function show(string $name) {
        $category = Category::where('name', $name)
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

        $allProducts = $category->products->merge(
            $category->subCategories->flatMap(function ($subCategory) {
                return $subCategory->products;
            })
        );

        return Inertia::render('Category/Show', [
            'category' => $category,
            'products' => $allProducts
        ]);
    }
}
