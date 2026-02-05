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
    
    // --- DASHBOARD ROUTES ---
    Route::get("shared/{$secureCookieSlug}/dashboard", function () {
        return Inertia::render('Shared/Dashboard');
    })->name('dashboard');

    Route::get("auth/{$secureCookieSlug}/dashboard/modules", function () {
        return Inertia::render('Shared/Modules');
    })->name('dashboard.modules');

    Route::get("auth/{$secureCookieSlug}/dashboard/research", function () {
        return Inertia::render('Shared/Research');
    })->name('dashboard.research');

    // --- STUDENT MANAGEMENT ROUTES (Complete CRUD) ---
    // List Students
    Route::get("teacher/{$secureCookieSlug}/students", [StudentController::class, 'index'])
        ->name('students.index');

    // Create Form
    Route::get("teacher/{$secureCookieSlug}/students/create", [StudentController::class, 'create'])
        ->name('students.create');
    
    // Store New Student (POST)
    Route::post("teacher/{$secureCookieSlug}/students", [StudentController::class, 'store'])
        ->name('students.store');

    // Edit Form (GET) - Ito ang hinahanap ng error mo kanina
    Route::get("teacher/{$secureCookieSlug}/students/{student}/edit", [StudentController::class, 'edit'])
        ->name('students.edit');

    // Update Student (PUT/PATCH)
    Route::match(['put', 'patch'], "teacher/{$secureCookieSlug}/students/{student}", [StudentController::class, 'update'])
        ->name('students.update');

    // Delete Student (DELETE)
    Route::delete("teacher/{$secureCookieSlug}/students/{student}", [StudentController::class, 'destroy'])
        ->name('students.destroy');


    // --- PROFILE ROUTES (Manage Account) ---
    // Edit Profile Form
    Route::get("user/{$secureCookieSlug}/profile", [ProfileController::class, 'edit'])
        ->name('profile.edit');

    // Update Profile Info
    Route::patch("user/{$secureCookieSlug}/profile", [ProfileController::class, 'update'])
        ->name('profile.update');

    // Delete Account
    Route::delete("user/{$secureCookieSlug}/profile", [ProfileController::class, 'destroy'])
        ->name('profile.destroy');

    // --- ACCOUNT ROUTES (Manage Account) ---
    // Edit Account Form
    Route::get("user/{$secureCookieSlug}/account", [AccountController::class, 'edit'])
        ->name('account.edit');

    // Update Account Info
    Route::post("user/{$secureCookieSlug}/account", [AccountController::class, 'update'])
        ->name('account.update');
        
});

require __DIR__.'/db.php';
require __DIR__.'/auth.php';
