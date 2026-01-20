<?php

namespace App\Repositories\Interfaces;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator; // <--- IMPORANT: Add this import

interface UserRepositoryInterface
{
    public function all(array $filters = []): Collection;

    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator;

    public function find(int $id): ?Model;

    public function findByEmail(string $email): ?Model;

    public function findByLRN(string $lrn): ?Model;

    public function create(array $data): Model;

    public function update(Model $user, array $data): bool;

    public function delete(Model $user): bool;

    /**
     * Updated to accept perPage and return Paginator
     */
    public function getStudentsWithSearch(?string $search = null, int $perPage = 10): LengthAwarePaginator;

    public function getStudentsPaginated(int $perPage = 10, ?string $search = null): LengthAwarePaginator;

    public function getByRole(string $role): Collection;
}