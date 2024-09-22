<?php

namespace App\Http\Middleware;

use App\Services\CartService;
use App\Services\CategoryService;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    public function __construct(
        protected CartService $cartService,
        protected CategoryService $categoryService
    )
    {
    }

    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'email' => $request->user()->email,
                    'name' => $request->user()->name,
                    'email_verified_at' => $request->user()->email_verified_at,
                    'is_admin' => $request->user()->isAdmin(),
                ] : null,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'categories' => $this->categoryService->getParentCategories(),
            'cart' => $this->cartService->getOrCreateCart(),
            'config' => [
                'stripe_key' => getenv('STRIPE_KEY')
            ]
        ];
    }
}
