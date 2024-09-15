<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ContentController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')
    ->name('admin.')
    ->middleware('auth')
    ->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('products', ProductController::class);

    Route::resource('categories', CategoryController::class);

    Route::get('/content/home', [ContentController::class, 'home'])->name('content.home');
    Route::get('/content/plp', [ContentController::class, 'plp'])->name('content.plp');
    Route::get('/content/pdp', [ContentController::class, 'pdp'])->name('content.pdp');
});
