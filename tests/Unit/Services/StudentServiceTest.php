<?php

namespace Tests\Unit\Services;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Services\StudentService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Mockery;
use Tests\TestCase;

class StudentServiceTest extends TestCase
{
    use RefreshDatabase;

    protected $mockRepository;
    protected $service;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->mockRepository = Mockery::mock(UserRepositoryInterface::class);
        $this->service = new StudentService($this->mockRepository);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    /**
     * Test that students can be retrieved with search.
     */
    public function test_students_can_be_retrieved_with_search(): void
    {
        $search = 'john';
        $perPage = 15;

        $this->mockRepository->shouldReceive('getStudentsPaginated')
            ->with($perPage, $search)
            ->andReturn(collect([
                new User(['name' => 'John Doe', 'email' => 'john@example.com', 'lrn' => '123456789012', 'role' => 'student'])
            ]));

        $result = $this->service->getStudentsWithSearch($search, $perPage);

        $this->assertCount(1, $result);
        $this->assertEquals('John Doe', $result->first()->name);
    }

    /**
     * Test that students can be created.
     */
    public function test_student_can_be_created(): void
    {
        $studentData = [
            'name' => 'New Student',
            'email' => 'newstudent@example.com',
            'lrn' => '345678901234',
            'password' => 'password123'
        ];

        $expectedData = [
            'name' => 'New Student',
            'email' => 'newstudent@example.com',
            'lrn' => '345678901234',
            'password' => Hash::make('password123'),
            'role' => 'student',
        ];

        $this->mockRepository->shouldReceive('create')
            ->with(Mockery::subset($expectedData))
            ->andReturn(new User($expectedData));

        $result = $this->service->createStudent($studentData);

        $this->assertInstanceOf(User::class, $result);
        $this->assertEquals('New Student', $result->name);
        $this->assertEquals('student', $result->role);
    }

    /**
     * Test that student updates work correctly.
     */
    public function test_student_can_be_updated(): void
    {
        $student = new User([
            'id' => 1,
            'name' => 'Old Name',
            'email' => 'old@example.com',
            'lrn' => '123456789012',
            'role' => 'student'
        ]);

        $updateData = [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
            'lrn' => '234567890123'
        ];

        $this->mockRepository->shouldReceive('update')
            ->with($student, $updateData)
            ->andReturn(true);

        $result = $this->service->updateStudent($student, $updateData);

        $this->assertTrue($result);
    }

    /**
     * Test that non-student users cannot be deleted.
     */
    public function test_non_student_users_cannot_be_deleted(): void
    {
        $admin = new User([
            'id' => 1,
            'name' => 'Admin User',
            'role' => 'admin'
        ]);

        $this->expectException(ValidationException::class);
        $this->expectExceptionMessage('Cannot delete non-student user.');

        $this->service->deleteStudent($admin);
    }

    /**
     * Test that student deletion works correctly.
     */
    public function test_student_can_be_deleted(): void
    {
        $student = new User([
            'id' => 1,
            'name' => 'Student User',
            'role' => 'student'
        ]);

        $this->mockRepository->shouldReceive('delete')
            ->with($student)
            ->andReturn(true);

        $result = $this->service->deleteStudent($student);

        $this->assertTrue($result);
    }

    /**
     * Test that student creation validates required fields.
     */
    public function test_student_creation_validates_required_fields(): void
    {
        $studentData = [
            'name' => '',
            'email' => 'invalid-email',
            'lrn' => '',
            'password' => 'weak'
        ];

        $this->expectException(ValidationException::class);

        $this->service->createStudent($studentData);
    }

    /**
     * Test that student creation validates unique constraints.
     */
    public function test_student_creation_validates_unique_constraints(): void
    {
        $studentData = [
            'name' => 'Duplicate Student',
            'email' => 'existing@example.com',
            'lrn' => '123456789012',
            'password' => 'password123'
        ];

        $this->expectException(ValidationException::class);

        $this->service->createStudent($studentData);
    }

    /**
     * Test that student update validates required fields.
     */
    public function test_student_update_validates_required_fields(): void
    {
        $student = new User([
            'id' => 1,
            'name' => 'Student User',
            'role' => 'student'
        ]);

        $updateData = [
            'name' => '',
            'email' => 'invalid-email',
            'lrn' => ''
        ];

        $this->expectException(ValidationException::class);

        $this->service->updateStudent($student, $updateData);
    }

    /**
     * Test that student update validates unique constraints.
     */
    public function test_student_update_validates_unique_constraints(): void
    {
        $student = new User([
            'id' => 1,
            'name' => 'Student User',
            'email' => 'student@example.com',
            'lrn' => '123456789012',
            'role' => 'student'
        ]);

        $updateData = [
            'name' => $student->name,
            'email' => 'existing@example.com', // Duplicate email
            'lrn' => 'existing-lrn' // Duplicate LRN
        ];

        $this->expectException(ValidationException::class);

        $this->service->updateStudent($student, $updateData);
    }
}
