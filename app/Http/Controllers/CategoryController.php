<?php

namespace App\Http\Controllers;

use App\Services\CategoryService;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function __construct(
        protected CategoryService $categoryService
    ) {}

    public function show(string $name) {
        return Inertia::render('Category/Show', [
            'category' => $this->categoryService->getCategoryByName($name),
            'products' => $this->categoryService->getCategoryProducts($name)
        ]);
    }
}
