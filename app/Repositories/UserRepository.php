<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class UserRepository implements UserRepositoryInterface
{
    /**
     * Get all users with optional search and filters
     */
    public function all(array $filters = []): Collection
    {
        $query = User::query();

        // Apply filters
        if (isset($filters['role'])) {
            $query->where('role', $filters['role']);
        }

        if (isset($filters['search'])) {
            $search = $filters['search'];
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('lrn', 'like', "%{$search}%");
            });
        }

        return $query->get();
    }

    /**
     * Get paginated users with optional search and filters
     */
    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        $query = User::query();

        // Apply filters
        if (isset($filters['role'])) {
            $query->where('role', $filters['role']);
        }

        if (isset($filters['search'])) {
            $search = $filters['search'];
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('lrn', 'like', "%{$search}%");
            });
        }

        return $query->paginate($perPage);
    }

    /**
     * Find user by ID
     */
    public function find(int $id): ?Model
    {
        return User::find($id);
    }

    /**
     * Find user by email
     */
    public function findByEmail(string $email): ?Model
    {
        return User::where('email', $email)->first();
    }

    /**
     * Find user by LRN
     */
    public function findByLRN(string $lrn): ?Model
    {
        return User::where('lrn', $lrn)->first();
    }

    /**
     * Create new user
     */
    public function create(array $data): Model
    {
        return User::create($data);
    }

    /**
     * Update user
     */
    public function update(Model $user, array $data): bool
    {
        return $user->update($data);
    }

    /**
     * Delete user
     */
    public function delete(Model $user): bool
    {
        return $user->delete();
    }

    /**
     * Get students with search functionality
     */
    public function getStudentsWithSearch(?string $search = null): Collection
    {
        $query = User::where('role', 'student');

        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('lrn', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        return $query->get();
    }

    /**
     * Get students with pagination and search
     */
    public function getStudentsPaginated(int $perPage = 15, ?string $search = null): LengthAwarePaginator
    {
        $query = User::where('role', 'student');

        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('lrn', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        return $query->paginate($perPage);
    }

    /**
     * Get users by role
     */
    public function getByRole(string $role): Collection
    {
        return User::where('role', $role)->get();
    }
}
