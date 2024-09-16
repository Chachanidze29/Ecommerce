<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Models\Category;
use App\Models\Product;
use App\Services\ProductService;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function __construct(
        protected ProductService $productService
    ) {}

    public function index() {
        $products = Product::with('categories')->orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products
        ]);
    }

    public function create() {
        return Inertia::render('Admin/Products/Create', [
            'categories' => Category::whereNull('parent_id')->get(),
        ]);
    }

    public function store(StoreProductRequest $request) {
        try {
            $validatedData = $request->validated();

            if ($request->hasFile('thumbnail')) {
                $validatedData['thumbnail'] = $request->file('thumbnail');
            }

            $this->productService->create($validatedData);

            return redirect()
                ->route('admin.products.index')
                ->with('success', __('Product created successfully!'));
        } catch (Exception $e) {
            Log::error($e);

            return redirect()
                ->back()
                ->with('error', __('Failed to create the product. Please try again.'));
        }
    }

    public function edit(Product $product) {
        $product->load('categories');

        return Inertia::render('Admin/Products/Edit', [
            'product' => [
                ...$product->toArray(),
                'categories' => $product->categories->pluck('id'),
                'thumbnail' => Storage::disk('public')->url($product->thumbnail),
            ],
            'product_id' => $product->id,
            'categories' => Category::whereNull('parent_id')->get(),
        ]);
    }

    public function destroy(Product $product) {
        $product->delete();

        return redirect()->back();
    }
}
