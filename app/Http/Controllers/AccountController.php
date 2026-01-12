<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest; // Or create a custom Request
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class AccountController extends Controller
{
    // Display the Manage Account page
    public function edit(Request $request)
    {
        return Inertia::render('Account/Edit', [
            'status' => session('status'),
        ]);
    }

    // Handle Profile & Password Updates
    public function update(Request $request)
    {
        // 1. Validate Input
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email,'.$request->user()->id],
            // Optional: Include password validation only if filled
            'password' => ['nullable', 'confirmed', Password::defaults()],
        ]);

        $user = $request->user();

        // 2. Update Basic Info
        $user->fill([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        // 3. Update Password (if provided)
        if (isset($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        // 4. Save
        if ($user->isDirty('email')) {
            $user->email_verified_at = null; // Reset verification if email changes
        }

        $user->save();

        return redirect()->route('account.edit')->with('status', 'Account updated successfully!');
    }
}