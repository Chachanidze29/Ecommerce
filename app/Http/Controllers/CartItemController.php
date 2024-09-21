<?php

namespace App\Http\Controllers;

use App\Models\CartItem;

class CartItemController extends Controller
{
    public function increment(CartItem $cartItem)
    {
        $cartItem->quantity += 1;
        $cartItem->save();

        return redirect()->back()->with('success', 'Item quantity increased.');
    }

    public function decrement(CartItem $cartItem)
    {
        if ($cartItem->quantity > 1) {
            $cartItem->quantity -= 1;
            $cartItem->save();
        } else {
            return redirect()->back()->with('error', 'Quantity cannot be less than 1.');
        }

        return redirect()->back()->with('success', 'Item quantity decreased.');
    }

    public function destroy(CartItem $cartItem)
    {
        $cartItem->delete();

        return redirect()->back()->with('success', 'Item removed from cart.');
    }
}
