<?php

namespace App\Repositories\Interfaces;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

interface UserRepositoryInterface
{
    /**
     * Get all users with optional search and filters
     */
    public function all(array $filters = []): Collection;

    /**
     * Get paginated users with optional search and filters
     */
    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator;

    /**
     * Find user by ID
     */
    public function find(int $id): ?Model;

    /**
     * Find user by email
     */
    public function findByEmail(string $email): ?Model;

    /**
     * Find user by LRN
     */
    public function findByLRN(string $lrn): ?Model;

    /**
     * Create new user
     */
    public function create(array $data): Model;

    /**
     * Update user
     */
    public function update(Model $user, array $data): bool;

    /**
     * Delete user
     */
    public function delete(Model $user): bool;

    /**
     * Get students with search functionality
     */
    public function getStudentsWithSearch(?string $search = null): Collection;

    /**
     * Get students with pagination and search
     */
    public function getStudentsPaginated(int $perPage = 15, ?string $search = null): LengthAwarePaginator;

    /**
     * Get users by role
     */
    public function getByRole(string $role): Collection;
}
