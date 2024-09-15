<?php

namespace App\Http\Controllers;

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
}
