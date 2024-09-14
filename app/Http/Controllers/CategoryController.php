<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function show(string $name) {
        $category = Category::where('name', $name)
            ->with(['products', 'subCategories', 'parentCategory'])
            ->firstOrFail();

        return Inertia::render('Category/Show', [
            'category' => $category,
        ]);
    }
}
