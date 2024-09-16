<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
            'category' => [
                ...$category->toArray(),
                'products' => $category->products->pluck('id'),
                'parent_category' => $category->parentCategory()->pluck('id')
            ],
            'category_id' => $category->id,
            'categories' => Category::whereNull('parent_id')->get(),
            'products' => Product::all()
        ]);
    }

    public function destroy(Category $category) {
        $category->delete();

        return redirect()->back();
    }

    /**
     * @param Request $request
     *
     * @return RedirectResponse
     */
    public function massDestroy(Request $request): RedirectResponse
    {
        Category::whereIn('id', $request->ids)->delete();

        return redirect()
            ->route('admin.categories.index')
            ->with('success', __(
                ':count category(s) deleted successfully!',
                ['count' => count($request->ids)]
            ));
    }
}
