<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index() {
        $categories = Category::with('parentCategory')
            ->withCount('products')
            ->get();

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories
        ]);
    }

    public function create() {
        return Inertia::render('Admin/Categories/Create', [
            'categories' => Category::whereNull('parent_id')->get(),
            'products' => Product::all()
        ]);
    }

    public function edit(Category $category) {
        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category,
            'category_id' => $category->id,
            'categories' => Category::whereNull('parent_id')->get(),
            'products' => Product::all()
        ]);
    }

    public function destroy(Category $category) {
        $category->delete();

        return redirect()->back();
    }
}
