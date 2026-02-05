<?php

namespace Tests\Unit\Controllers;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class StudentControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that students can be listed with search functionality.
     */
    public function test_students_can_be_listed_with_search(): void
    {
        // Create test students
        $student1 = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'lrn' => '123456789012',
            'role' => 'student'
        ]);

        $student2 = User::factory()->create([
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'lrn' => '234567890123',
            'role' => 'student'
        ]);

        // Create a teacher (should not appear in student list)
        User::factory()->create([
            'name' => 'Teacher User',
            'role' => 'teacher'
        ]);

        // Test without search
        $response = $this->actingAs($student1)
            ->get(route('students.index'));

        $response->assertStatus(200);
        $response->assertViewHas('students');
        
        $students = $response->viewData('students');
        $this->assertCount(2, $students);
        $this->assertTrue($students->contains('id', $student1->id));
        $this->assertTrue($students->contains('id', $student2->id));

        // Test with search by name
        $response = $this->actingAs($student1)
            ->get(route('students.index', ['search' => 'John']));

        $response->assertStatus(200);
        $students = $response->viewData('students');
        $this->assertCount(1, $students);
        $this->assertTrue($students->contains('id', $student1->id));

        // Test with search by LRN
        $response = $this->actingAs($student1)
            ->get(route('students.index', ['search' => '234567890123']));

        $response->assertStatus(200);
        $students = $response->viewData('students');
        $this->assertCount(1, $students);
        $this->assertTrue($students->contains('id', $student2->id));

        // Test with search by email
        $response = $this->actingAs($student1)
            ->get(route('students.index', ['search' => 'jane@example.com']));

        $response->assertStatus(200);
        $students = $response->viewData('students');
        $this->assertCount(1, $students);
        $this->assertTrue($students->contains('id', $student2->id));
    }

    /**
     * Test that student creation works correctly.
     */
    public function test_student_can_be_created(): void
    {
        $teacher = User::factory()->create(['role' => 'teacher']);

        $studentData = [
            'name' => 'New Student',
            'email' => 'newstudent@example.com',
            'lrn' => '345678901234',
            'password' => 'password123'
        ];

        $response = $this->actingAs($teacher)
            ->post(route('students.store'), $studentData);

        $response->assertRedirect(route('students.index'));
        $response->assertSessionHas('success', 'Student created successfully.');

        // Verify student was created
        $this->assertDatabaseHas('users', [
            'name' => 'New Student',
            'email' => 'newstudent@example.com',
            'lrn' => '345678901234',
            'role' => 'student'
        ]);

        // Verify password was hashed
        $createdStudent = User::where('email', 'newstudent@example.com')->first();
        $this->assertTrue(Hash::check('password123', $createdStudent->password));
    }

    /**
     * Test that student creation validates unique constraints.
     */
    public function test_student_creation_validates_unique_constraints(): void
    {
        $teacher = User::factory()->create(['role' => 'teacher']);
        
        // Create existing student
        User::factory()->create([
            'email' => 'existing@example.com',
            'lrn' => '123456789012'
        ]);

        $studentData = [
            'name' => 'Duplicate Student',
            'email' => 'existing@example.com', // Duplicate email
            'lrn' => '123456789012', // Duplicate LRN
            'password' => 'password123'
        ];

        $response = $this->actingAs($teacher)
            ->post(route('students.store'), $studentData);

        $response->assertSessionHasErrors(['email', 'lrn']);
        $this->assertDatabaseMissing('users', ['name' => 'Duplicate Student']);
    }

    /**
     * Test that student editing shows correct form.
     */
    public function test_student_edit_form_shows_correctly(): void
    {
        $teacher = User::factory()->create(['role' => 'teacher']);
        $student = User::factory()->create(['role' => 'student']);

        $response = $this->actingAs($teacher)
            ->get(route('students.edit', $student));

        $response->assertStatus(200);
        $response->assertViewHas('student', $student);
    }

    /**
     * Test that non-student users cannot be edited.
     */
    public function test_non_student_users_cannot_be_edited(): void
    {
        $teacher = User::factory()->create(['role' => 'teacher']);
        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($teacher)
            ->get(route('students.edit', $admin));

        $response->assertStatus(403);
    }

    /**
     * Test that student updates work correctly.
     */
    public function test_student_can_be_updated(): void
    {
        $teacher = User::factory()->create(['role' => 'teacher']);
        $student = User::factory()->create([
            'role' => 'student',
            'name' => 'Old Name',
            'email' => 'old@example.com',
            'lrn' => '123456789012'
        ]);

        $updateData = [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
            'lrn' => '234567890123'
        ];

        $response = $this->actingAs($teacher)
            ->put(route('students.update', $student), $updateData);

        $response->assertRedirect(route('students.index'));
        $response->assertSessionHas('success', 'Student updated successfully.');

        // Verify updates
        $this->assertDatabaseHas('users', [
            'id' => $student->id,
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
            'lrn' => '234567890123'
        ]);
    }

    /**
     * Test that student deletion works correctly.
     */
    public function test_student_can_be_deleted(): void
    {
        $teacher = User::factory()->create(['role' => 'teacher']);
        $student = User::factory()->create(['role' => 'student']);

        $response = $this->actingAs($teacher)
            ->delete(route('students.destroy', $student));

        $response->assertRedirect(route('students.index'));
        $response->assertSessionHas('success', 'Student deleted.');

        // Verify student was deleted
        $this->assertDatabaseMissing('users', ['id' => $student->id]);
    }

    /**
     * Test that non-student users cannot be deleted.
     */
    public function test_non_student_users_cannot_be_deleted(): void
    {
        $teacher = User::factory()->create(['role' => 'teacher']);
        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($teacher)
            ->delete(route('students.destroy', $admin));

        $response->assertStatus(403);
    }

    /**
     * Test that only authenticated users can access student management.
     */
    public function test_unauthenticated_users_cannot_access_student_management(): void
    {
        $response = $this->get(route('students.index'));
        $response->assertRedirect(route('login'));

        $response = $this->post(route('students.store'), []);
        $response->assertRedirect(route('login'));

        $response = $this->get(route('students.create'));
        $response->assertRedirect(route('login'));

        $student = User::factory()->create(['role' => 'student']);
        $response = $this->get(route('students.edit', $student));
        $response->assertRedirect(route('login'));

        $response = $this->put(route('students.update', $student), []);
        $response->assertRedirect(route('login'));

        $response = $this->delete(route('students.destroy', $student));
        $response->assertRedirect(route('login'));
    }
}
