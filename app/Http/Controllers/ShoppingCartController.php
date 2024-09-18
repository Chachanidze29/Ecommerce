<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ShoppingCartController extends Controller
{
    public function __construct(
        protected CartService $cartService
    ) {}

    public function show(Cart $cart) {
        return Inertia::render('Cart', [
            'cart' => $cart
        ]);
    }

    public function create(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric'
        ]);

        try {
            $cart = $this->cartService->getOrCreateCart();

            $existingItem = $cart->items()->where('product_id', $validated['product_id'])->first();

            if ($existingItem) {
                $existingItem->quantity += $validated['quantity'];
                $existingItem->save();
                return redirect()->back()->with('success', "Product quantity increased");
            } else {
                $cart->items()->create($validated);
                return redirect()->back()->with('success', "Product successfully added to cart");
            }
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', 'Error saving item to cart');
        }
    }
}
