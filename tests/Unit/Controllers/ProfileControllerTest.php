<?php

namespace Tests\Unit\Controllers;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that profile edit form shows correctly.
     */
    public function test_profile_edit_form_shows_correctly(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->get(route('profile.edit'));

        $response->assertStatus(200);
        $response->assertViewHas('mustVerifyEmail');
        $response->assertViewHas('status');
    }

    /**
     * Test that profile information can be updated.
     */
    public function test_profile_information_can_be_updated(): void
    {
        $user = User::factory()->create([
            'name' => 'Old Name',
            'email' => 'old@example.com'
        ]);

        $updateData = [
            'name' => 'New Name',
            'email' => 'new@example.com'
        ];

        $response = $this->actingAs($user)
            ->patch(route('profile.update'), $updateData);

        $response->assertRedirect(route('profile.edit'));
        $response->assertSessionHasNoErrors();

        // Verify updates
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'New Name',
            'email' => 'new@example.com'
        ]);
    }

    /**
     * Test that email verification is reset when email changes.
     */
    public function test_email_verification_is_reset_when_email_changes(): void
    {
        $user = User::factory()->create([
            'email_verified_at' => now()
        ]);

        $updateData = [
            'name' => $user->name,
            'email' => 'new@example.com'
        ];

        $response = $this->actingAs($user)
            ->patch(route('profile.update'), $updateData);

        $response->assertRedirect(route('profile.edit'));
        
        // Verify email verification was reset
        $this->assertNull($user->fresh()->email_verified_at);
    }

    /**
     * Test that email verification status is unchanged when email is unchanged.
     */
    public function test_email_verification_status_is_unchanged_when_email_is_unchanged(): void
    {
        $user = User::factory()->create([
            'email_verified_at' => now()
        ]);

        $updateData = [
            'name' => 'New Name',
            'email' => $user->email
        ];

        $response = $this->actingAs($user)
            ->patch(route('profile.update'), $updateData);

        $response->assertRedirect(route('profile.edit'));
        $response->assertSessionHasNoErrors();
        
        // Verify email verification was not reset
        $this->assertNotNull($user->fresh()->email_verified_at);
    }

    /**
     * Test that profile can be deleted.
     */
    public function test_profile_can_be_deleted(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->delete(route('profile.destroy'), [
                'password' => 'password'
            ]);

        $response->assertRedirect('/');
        $response->assertSessionHasNoErrors();

        // Verify user was deleted
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    /**
     * Test that correct password is required to delete profile.
     */
    public function test_correct_password_is_required_to_delete_profile(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->delete(route('profile.destroy'), [
                'password' => 'wrong-password'
            ]);

        $response->assertSessionHasErrors(['password']);
        $response->assertRedirect(route('profile.edit'));

        // Verify user was not deleted
        $this->assertDatabaseHas('users', ['id' => $user->id]);
    }

    /**
     * Test that unauthenticated users cannot access profile management.
     */
    public function test_unauthenticated_users_cannot_access_profile_management(): void
    {
        $response = $this->get(route('profile.edit'));
        $response->assertRedirect(route('login'));

        $response = $this->patch(route('profile.update'), []);
        $response->assertRedirect(route('login'));

        $response = $this->delete(route('profile.destroy'), []);
        $response->assertRedirect(route('login'));
    }

    /**
     * Test that profile update validates input.
     */
    public function test_profile_update_validates_input(): void
    {
        $user = User::factory()->create();

        $invalidData = [
            'name' => '', // Empty name
            'email' => 'invalid-email' // Invalid email format
        ];

        $response = $this->actingAs($user)
            ->patch(route('profile.update'), $invalidData);

        $response->assertSessionHasErrors(['name', 'email']);
    }
}
