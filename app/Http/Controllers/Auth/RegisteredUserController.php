<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Mail\StudentAccountCreated;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log; // <--- 1. IMPORT THIS
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'lrn' => 'nullable|string|size:12|unique:users,lrn',
            'role' => 'student',
            'password' => ['required', 'confirmed', Rules\Password::min(12)->mixedCase()->numbers()->symbols()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'lrn' => $request->lrn,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        // --- 2. LOGGING BLOCK START ---
        try {
            Mail::to($user->email)->send(new StudentAccountCreated($user));
            Log::info("Email sent successfully to: " . $user->email);
        } catch (\Exception $e) {
            // This logs the specific error message to storage/logs/laravel.log
            Log::error("MAILER ERROR for user {$user->email}: " . $e->getMessage());
        }
        // --- LOGGING BLOCK END ---

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}