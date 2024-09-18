<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;

class CartItemController extends Controller
{
    public function increment(Request $request, CartItem $cartItem)
    {
        $cartItem->quantity += 1;
        $cartItem->save();

        return redirect()->back()->with('success', 'Item quantity increased.');
    }

    public function decrement(Request $request, CartItem $cartItem)
    {
        if ($cartItem->quantity > 1) {
            $cartItem->quantity -= 1;
            $cartItem->save();
        } else {
            return redirect()->back()->with('error', 'Quantity cannot be less than 1.');
        }

        return redirect()->back()->with('success', 'Item quantity decreased.');
    }

    public function destroy(Request $request, CartItem $cartItem)
    {
        $cartItem->delete();

        return redirect()->back()->with('success', 'Item removed from cart.');
    }
}
