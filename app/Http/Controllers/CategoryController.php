<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function show(Category $category) {
        return Inertia::render('Category/Show', [
            'category' => $category->with('products'),
        ]);
    }
}
