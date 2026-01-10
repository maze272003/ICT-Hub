<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// --- PUBLIC ROUTES ---
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

$sessionCookie = request()->cookie('laravel_session') ?? 'guest-access';

// I-hash ang cookie kasama ang APP_KEY para siguradong random at secure
$secureCookieSlug = substr(md5($sessionCookie . config('app.key')), 0, 100);

Route::middleware(['auth', 'verified'])->group(function () use ($secureCookieSlug) {
    
    // Dashboard Route gamit ang hashed cookie slug
    Route::get("shared/{$secureCookieSlug}/dashboard", function () {
        return Inertia::render('Shared/Dashboard');
    })->name('dashboard');
    Route::get("auth/{$secureCookieSlug}/dashboard/modules", function () {
        return Inertia::render('Shared/Modules');
    })->name('dashboard.modules');

    // Teacher Management Routes
    Route::get("teacher/{$secureCookieSlug}/students", [StudentController::class, 'index'])
        ->name('students.index');

    Route::get("teacher/{$secureCookieSlug}/students/create", [StudentController::class, 'create'])
        ->name('students.create');

    // Profile Routes
    Route::get("user/{$secureCookieSlug}/profile", [ProfileController::class, 'edit'])
        ->name('profile.edit');
});

require __DIR__.'/auth.php';