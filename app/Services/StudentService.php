<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;

class StudentService
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Get paginated students with search
     */
    public function getStudentsWithSearch(?string $search = null, int $perPage = 15)
    {
        return $this->userRepository->getStudentsPaginated($perPage, $search);
    }

    /**
     * Create a new student
     */
    public function createStudent(array $data): User
    {
        // Validate input data
        $this->validateStudentCreation($data);

        // Prepare student data
        $studentData = [
            'name' => $data['name'],
            'email' => $data['email'],
            'lrn' => $data['lrn'],
            'password' => Hash::make($data['password']),
            'role' => 'student',
        ];

        // Create student
        return $this->userRepository->create($studentData);
    }

    /**
     * Update student information
     */
    public function updateStudent(User $student, array $data): bool
    {
        // Validate input data
        $this->validateStudentUpdate($data, $student);

        // Prepare update data
        $updateData = [
            'name' => $data['name'],
            'email' => $data['email'],
            'lrn' => $data['lrn'],
        ];

        // Update student
        return $this->userRepository->update($student, $updateData);
    }

    /**
     * Delete a student
     */
    public function deleteStudent(User $student): bool
    {
        // Security check: ensure the user is actually a student
        if ($student->role !== 'student') {
            throw ValidationException::withMessages([
                'student' => ['Cannot delete non-student user.']
            ]);
        }

        return $this->userRepository->delete($student);
    }

    /**
     * Validate student creation data
     */
    protected function validateStudentCreation(array $data): void
    {
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'lrn' => ['required', 'string', 'unique:users,lrn'],
            'password' => ['required', 'string', 'min:8'],
        ];

        $validator = \Validator::make($data, $rules);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }
    }

    /**
     * Validate student update data
     */
    protected function validateStudentUpdate(array $data, User $student): void
    {
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email'],
            'lrn' => ['required', 'string'],
        ];

        // Add unique rules excluding current student
        if (isset($data['email'])) {
            $rules['email'][] = Rule::unique('users')->ignore($student->id);
        }

        if (isset($data['lrn'])) {
            $rules['lrn'][] = Rule::unique('users')->ignore($student->id);
        }

        $validator = \Validator::make($data, $rules);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }
    }
}
