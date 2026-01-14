<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class StudentController extends Controller
{
    // --- READ (List with Search) ---
    public function index(Request $request)
    {
        $query = User::where('role', 'student');

        // Search Logic
        if ($request->input('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('lrn', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        return Inertia::render('Teacher/Students/Index', [
            'students' => $query->latest()->get(), // Or ->paginate(10) if you want pages
            'filters' => $request->only(['search']),
        ]);
    }

    // --- CREATE (Show Form) ---
    public function create()
    {
        return Inertia::render('Teacher/Students/Create');
    }

    // --- STORE (Save New Student) ---
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'lrn' => 'required|string|unique:users,lrn',
            // 'section' => 'required|string', // Uncomment if you added this column
            'password' => 'required|string|min:8',
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'lrn' => $validated['lrn'],
            'password' => Hash::make($validated['password']),
            'role' => 'student', // Force role to student
            // 'section' => $validated['section'],
        ]);

        return Redirect::route('students.index')->with('success', 'Student created successfully.');
    }

    // --- EDIT (Show Form) ---
    public function edit(User $student)
    {
        // Security check: ensure the user being edited is actually a student
        if ($student->role !== 'student') {
            abort(403);
        }

        return Inertia::render('Teacher/Students/Edit', [
            'student' => $student
        ]);
    }

    // --- UPDATE (Save Changes) ---
    public function update(Request $request, User $student)
    {
        if ($student->role !== 'student') {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('users')->ignore($student->id)],
            'lrn' => ['required', 'string', Rule::unique('users')->ignore($student->id)],
            // 'section' => 'required|string',
        ]);

        $student->update($validated);

        return Redirect::route('students.index')->with('success', 'Student updated successfully.');
    }

    // --- DELETE (Remove Student) ---
    public function destroy(User $student)
    {
        if ($student->role !== 'student') {
            abort(403);
        }

        $student->delete();

        return Redirect::back()->with('success', 'Student deleted.');
    }
}