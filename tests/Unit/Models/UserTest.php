<?php

namespace Tests\Unit\Models;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that user can be created with mass assignable attributes.
     */
    public function test_user_can_be_created_with_mass_assignable_attributes(): void
    {
        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'lrn' => '123456789012',
            'password' => 'password123',
            'role' => 'student'
        ];

        $user = User::create($userData);

        $this->assertDatabaseHas('users', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'lrn' => '123456789012',
            'role' => 'student'
        ]);

        $this->assertTrue(Hash::check('password123', $user->password));
    }

    /**
     * Test that password is automatically hashed.
     */
    public function test_password_is_automatically_hashed(): void
    {
        $user = User::factory()->create([
            'password' => 'plain-text-password'
        ]);

        $this->assertNotEquals('plain-text-password', $user->password);
        $this->assertTrue(Hash::check('plain-text-password', $user->password));
    }

    /**
     * Test that sensitive attributes are hidden in serialization.
     */
    public function test_sensitive_attributes_are_hidden_in_serialization(): void
    {
        $user = User::factory()->create();

        $userArray = $user->toArray();

        $this->assertArrayNotHasKey('password', $userArray);
        $this->assertArrayNotHasKey('remember_token', $userArray);
        $this->assertArrayHasKey('name', $userArray);
        $this->assertArrayHasKey('email', $userArray);
    }

    /**
     * Test that password casting works correctly.
     */
    public function test_password_casting_works_correctly(): void
    {
        $user = User::factory()->create();

        $casts = $user->getCasts();

        $this->assertArrayHasKey('password', $casts);
        $this->assertEquals('hashed', $casts['password']);
    }

    /**
     * Test that email_verified_at casting works correctly.
     */
    public function test_email_verified_at_casting_works_correctly(): void
    {
        $user = User::factory()->create([
            'email_verified_at' => now()
        ]);

        $casts = $user->getCasts();

        $this->assertArrayHasKey('email_verified_at', $casts);
        $this->assertEquals('datetime', $casts['email_verified_at']);

        // Test that it's actually cast to Carbon instance
        $this->assertInstanceOf(\Carbon\Carbon::class, $user->email_verified_at);
    }

    /**
     * Test that user factory creates valid users.
     */
    public function test_user_factory_creates_valid_users(): void
    {
        $user = User::factory()->create();

        $this->assertNotNull($user->name);
        $this->assertNotNull($user->email);
        $this->assertNotNull($user->password);
        $this->assertNotNull($user->role);
        $this->assertDatabaseHas('users', ['id' => $user->id]);
    }

    /**
     * Test that user can have different roles.
     */
    public function test_user_can_have_different_roles(): void
    {
        $roles = ['student', 'teacher', 'admin'];

        foreach ($roles as $role) {
            $user = User::factory()->create(['role' => $role]);
            $this->assertEquals($role, $user->role);
        }
    }

    /**
     * Test that LRN can be null.
     */
    public function test_lrn_can_be_null(): void
    {
        $user = User::factory()->create(['lrn' => null]);

        $this->assertNull($user->lrn);
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'lrn' => null
        ]);
    }
}
