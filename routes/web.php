<?php

use App\Http\Controllers\CartItemController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShoppingCartController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/categories/{category:name}', [CategoryController::class, 'show'])->name('category');
Route::get('/products/{product}', [ProductController::class, 'show'])->name('product.show');
Route::get('/catalog', [CatalogController::class, 'index'])->name('catalog');
Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout');
Route::post('/checkout/shipping', [CheckoutController::class, 'validateShippingInformation'])->name('checkout.shipping');
Route::post('/checkout', [CheckoutController::class, 'processPayment'])->name('checkout.process');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/cart', [ShoppingCartController::class, 'show'])->name('cart');
Route::post('/cart', [ShoppingCartController::class, 'create'])->name('cart.create');
Route::delete('/cart', [ShoppingCartController::class, 'destroy'])->name('cart.destroy');

Route::patch('/cart/item/{cartItem}/increment', [CartItemController::class, 'increment'])->name('cart.item.increment');
Route::patch('/cart/item/{cartItem}/decrement', [CartItemController::class, 'decrement'])->name('cart.item.decrement');
Route::delete('/cart/item/{cartItem}', [CartItemController::class, 'destroy'])->name('cart.item.destroy');

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
