<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Services\StudentService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class StudentController extends Controller
{
    protected StudentService $studentService;
    protected UserRepositoryInterface $userRepository;

    public function __construct(StudentService $studentService, UserRepositoryInterface $userRepository)
    {
        $this->studentService = $studentService;
        $this->userRepository = $userRepository;
    }

    /**
     * Display a listing of students with search functionality
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $perPage = $request->input('per_page', 15);

        $students = $this->studentService->getStudentsWithSearch($search, $perPage);

        return Inertia::render('Teacher/Students/Index', [
            'students' => $students->items(), // Pass the actual data array instead of pagination object
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new student
     */
    public function create()
    {
        return Inertia::render('Teacher/Students/Create');
    }

    /**
     * Store a newly created student in storage
     */
    public function store(Request $request)
    {
        try {
            $student = $this->studentService->createStudent($request->all());
            
            return redirect()->route('students.index')->with('success', 'Student created successfully.');
        } catch (ValidationException $e) {
            return redirect()->back()
                ->withErrors($e->errors())
                ->withInput();
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'An error occurred while creating the student.')
                ->withInput();
        }
    }

    /**
     * Show the form for editing the specified student
     */
    public function edit(User $student)
    {
        // Security check: ensure the user being edited is actually a student
        if ($student->role !== 'student') {
            abort(Response::HTTP_FORBIDDEN);
        }

        return Inertia::render('Teacher/Students/Edit', [
            'student' => $student
        ]);
    }

    /**
     * Update the specified student in storage
     */
    public function update(Request $request, User $student)
    {
        // Security check: ensure the user being edited is actually a student
        if ($student->role !== 'student') {
            abort(Response::HTTP_FORBIDDEN);
        }

        try {
            $this->studentService->updateStudent($student, $request->all());
            
            return redirect()->route('students.index')->with('success', 'Student updated successfully.');
        } catch (ValidationException $e) {
            return redirect()->back()
                ->withErrors($e->errors())
                ->withInput();
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'An error occurred while updating the student.')
                ->withInput();
        }
    }

    /**
     * Remove the specified student from storage
     */
    public function destroy(User $student)
    {
        // Security check: ensure the user being deleted is actually a student
        if ($student->role !== 'student') {
            abort(Response::HTTP_FORBIDDEN);
        }

        try {
            $this->studentService->deleteStudent($student);
            
            return redirect()->back()->with('success', 'Student deleted successfully.');
        } catch (ValidationException $e) {
            return redirect()->back()
                ->with('error', $e->getMessage());
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'An error occurred while deleting the student.');
        }
    }
}
