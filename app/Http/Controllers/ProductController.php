<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use App\Services\ProductService;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function __construct(
        protected ProductService $productService
    ) {}

    public function index() {
        return Inertia::render('Admin/Products/Index', [
            'products' => Product::with('categories')->orderBy('created_at', 'desc')->get()
        ]);
    }

    public function show(Product $product) {
        return Inertia::render('Admin/Products/Show', [
            'product' => $product
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

            if ($request->hasFile('images')) {
                $validatedData['images'] = $request->file('images');
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
        $product->load([
            'categories',
            'images' => function ($query) {
                $query->select('path', 'product_id');
            }
        ]);

        return Inertia::render('Admin/Products/Edit', [
            'product' => [
                ...$product->toArray(),
                'categories' => $product->categories->pluck('id'),
                'thumbnail' => $product->thumbnail,
                'images' => $product->images->pluck('path'), // Return only image paths
            ],
            'categories' => Category::whereNull('parent_id')->get(),
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product) {
        try {
            $validatedData = $request->validated();

            if ($request->hasFile('thumbnail')) {
                $validatedData['thumbnail'] = $request->file('thumbnail');
            }

            $this->productService->update($validatedData, $product->id);

            return redirect()
                ->route('admin.products.index', $product->id)
                ->with('success', __('Product updated successfully!'));
        } catch (Exception $e) {
            Log::error($e);

            return redirect()
                ->back()
                ->with('error', __('Failed to update the product. Please try again.'));
        }
    }

    public function destroy(Product $product) {
        $product->delete();

        return redirect()->back();
    }

    /**
     * @param Request $request
     *
     * @return RedirectResponse
     */
    public function massDestroy(Request $request): RedirectResponse
    {
        Product::whereIn('id', $request->ids)->delete();

        return redirect()
            ->route('admin.products.index')
            ->with('success', __(
                ':count product(s) deleted successfully!',
                ['count' => count($request->ids)]
            ));
    }
}
