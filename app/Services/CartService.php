<?php

namespace App\Services;

use App\Models\Cart;
use Illuminate\Support\Facades\Log;

class CartService
{
    public function getOrCreateCart()
    {
        if (auth()->check()) {
            $cart = Cart::with(['customer', 'items', 'items.product', 'items.product.images'])
                ->withSum('items', 'quantity')
                ->firstOrCreate(['user_id' => auth()->id()]);
        } else {
            $sessionId = session()->getId();
            $cart = Cart::with('items', 'items.product', 'items.product.images')
                ->withSum('items', 'quantity')
                ->firstOrCreate(['session_id' => $sessionId]);
        }

        $subtotal = $cart->items->sum(function ($item) {
            return $item->price * $item->quantity;
        });

        $cart->subtotal = round($subtotal, 2);

        return $cart;
    }

    public function transferGuestCartToUser(): void
    {
        if (auth()->check()) {
            $sessionId = session()->getId();
            Log::info("Session ID: $sessionId");

            $guestCart = Cart::where('session_id', $sessionId)->first();

            if ($guestCart) {
                Log::info("Guest cart found for session ID: $sessionId");

                $guestCart->user_id = auth()->id();
                $guestCart->session_id = null;
                $guestCart->save();
            } else {
                Log::info("No guest cart found for session ID: $sessionId");
            }
        }
    }

    public function clearCart(Cart $cart): void
    {
        $cart->items()->delete();
        $cart->delete();
    }
}
