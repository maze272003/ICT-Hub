<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
// Temporary test route sa web.php
$dashboardSlug = substr(md5(config('app.key') . 'shared-dashboard'), 0, 12);
Route::get("auth/{$dashboardSlug}/dashboard", function () {
    return Inertia::render('Shared/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

$teacherSlug = substr(md5(config('app.key') . 'teacher-portal'), 0, 64);
Route::middleware(['auth', 'verified'])->group(function () use ($teacherSlug) {
    Route::get("/portal/{$teacherSlug}/students", [StudentController::class, 'index'])
        ->name('students.index');

    // Ang URL nito ay magiging: /portal/[random-hash]/students/create
    Route::get("/portal/{$teacherSlug}/students/create", [StudentController::class, 'create'])
        ->name('students.create');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
