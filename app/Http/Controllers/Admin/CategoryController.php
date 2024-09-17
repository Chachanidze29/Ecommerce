<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use App\Models\Product;
use App\Services\CategoryService;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function __construct(
        protected CategoryService $categoryService
    ) {}

    public function index() {
        $categories = Category::with('parentCategory')
            ->withCount('products')
            ->orderBy('updated_at', 'desc')
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

    public function store(StoreCategoryRequest $request) {
        try {
            $validatedData = $request->validated();

            $this->categoryService->create($validatedData);

            return redirect()
                ->route('admin.categories.index')
                ->with('success', __('Category created successfully!'));
        } catch (Exception $exception) {
            Log::error($exception->getMessage());

            return redirect()
                ->back()
                ->with('error', __('Failed to store the category. Please try again.'));
        }
    }

    public function edit(Category $category) {
        return Inertia::render('Admin/Categories/Edit', [
            'category' => [
                ...$category->toArray(),
                'products' => $category->products->pluck('id'),
                'parent_category' => $category->parentCategory()->value('id')
            ],
            'category_id' => $category->id,
            'categories' => Category::whereNull('parent_id')->get(),
            'products' => Product::all()
        ]);
    }

    public function update(UpdateCategoryRequest $request, Category $category) {
        try {
            $validatedData = $request->validated();

            $this->categoryService->update($validatedData, $category->id);

            return redirect()
                ->route('admin.categories.index')
                ->with('success', __('Category updated successfully!'));
        } catch (Exception $exception) {
            Log::error($exception->getMessage());

            return redirect()
                ->back()
                ->with('error', __('Failed to update the category. Please try again.'));
        }
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
