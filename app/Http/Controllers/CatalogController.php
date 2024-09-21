<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Services\CategoryService;
use App\Services\ProductService;
use Inertia\Inertia;

class CatalogController extends Controller
{
    public function __construct(
        protected ProductService $productService,
        protected CategoryService $categoryService
    ) {}

    public function index() {
        return Inertia::render('Catalog', [
            'products' => $this->productService->getAllProductsWithPagination(),
            'catalogCategories' => $this->categoryService->getParentCategories()
        ]);
    }
}
