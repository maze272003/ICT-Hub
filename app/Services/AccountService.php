<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rules\Password;

class AccountService
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Update user account information
     */
    public function updateAccount(User $user, array $data): array
    {
        // Validate input data
        $this->validateAccountUpdate($data, $user);

        // Prepare update data
        $updateData = [
            'name' => $data['name'],
            'email' => $data['email'],
        ];

        // Handle password update if provided
        if (isset($data['password']) && !empty($data['password'])) {
            $updateData['password'] = Hash::make($data['password']);
        }

        // Update user
        $this->userRepository->update($user, $updateData);

        // Reset email verification if email changed
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
            $user->save();
        }

        return [
            'success' => true,
            'message' => 'Account updated successfully!'
        ];
    }

    /**
     * Validate account update data
     */
    protected function validateAccountUpdate(array $data, User $user): void
    {
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
        ];

        // Add unique rule excluding current user
        if (isset($data['email'])) {
            $rules['email'][] = 'unique:users,email,' . $user->id;
        }

        // Add password validation if provided
        if (isset($data['password']) && !empty($data['password'])) {
            $rules['password'] = ['required', 'confirmed', Password::defaults()];
        }

        $validator = \Validator::make($data, $rules);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }
    }

    /**
     * Get account data for editing
     */
    public function getAccountData(): array
    {
        return [
            'status' => session('status'),
        ];
    }
}
