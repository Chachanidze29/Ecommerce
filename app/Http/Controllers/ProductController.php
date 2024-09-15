<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index() {
        $products = Product::with('categories')->get();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products
        ]);
    }

    public function create() {
        return Inertia::render('Admin/Products/Create', [
            'categories' => Category::whereNull('parent_id')->get(),
        ]);
    }

    public function edit(Product $product) {
        $product->load('categories');

        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'product_id' => $product->id,
            'categories' => Category::whereNull('parent_id')->get(),
        ]);
    }

    public function destroy(Product $product) {
        $product->delete();

        return redirect()->back();
    }
}
