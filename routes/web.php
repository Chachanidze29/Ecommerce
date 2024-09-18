<?php

use App\Http\Controllers\CartItemController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShoppingCartController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/category/{category:name}', [CategoryController::class, 'show'])->name('category');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/cart', [ShoppingCartController::class, 'show'])->name('cart');
Route::post('/cart', [ShoppingCartController::class, 'create'])->name('cart.create');
Route::delete('/cart/{cart}', [ShoppingCartController::class, 'destroy'])->name('cart.destroy');

Route::patch('/cart/item/{cartItem}/increment', [CartItemController::class, 'increment'])->name('cart.item.increment');
Route::patch('/cart/item/{cartItem}/decrement', [CartItemController::class, 'decrement'])->name('cart.item.decrement');
Route::delete('/cart/item/{cartItem}', [CartItemController::class, 'destroy'])->name('cart.item.destroy');

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
