<?php

use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Customer\CustomerController;
use App\Http\Controllers\CustomerClosing\CustomerClosingController;
use App\Http\Controllers\Packages\PackagesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Promo\PromoController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::middleware('auth')->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
    Route::post('logout', [LoginController::class, 'destroy'])->name('logout');

    Route::middleware(['auth.superMarketing'])->group(function () {
        Route::apiResource('users', UserController::class);
    });

    Route::apiResource('packages', PackagesController::class);
    Route::apiResource('promos', PromoController::class);
    Route::post('promos/{promo}', [PromoController::class, 'update']);
    Route::apiResource('customers', CustomerController::class);
    Route::post('customers/{customer}', [CustomerController::class, 'updateClosing'])->name('customer.update_closing');
    Route::apiResource('customers-closing', CustomerClosingController::class);

    Route::get('profile', ProfileController::class)->name('profile');
});

Route::middleware('guest')->group(function () {
    Route::get('login', [LoginController::class, 'create'])->name('login');
    Route::post('login', [LoginController::class, 'store']);

    Route::get('register', [RegisterController::class, 'create'])->name('register');
    Route::post('register', [RegisterController::class, 'store']);
});

