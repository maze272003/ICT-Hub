<?php

namespace Tests\Unit\Controllers;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Services\AccountService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Mockery;
use Tests\TestCase;

class AccountControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $mockRepository;
    protected $mockService;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->mockRepository = Mockery::mock(UserRepositoryInterface::class);
        $this->mockService = Mockery::mock(AccountService::class);
        
        $this->app->instance(UserRepositoryInterface::class, $this->mockRepository);
        $this->app->instance(AccountService::class, $this->mockService);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    /**
     * Test that account edit form shows correctly.
     */
    public function test_account_edit_form_shows_correctly(): void
    {
        $user = User::factory()->create();

        $this->mockService->shouldReceive('getAccountData')
            ->andReturn(['status' => session('status')]);

        $response = $this->actingAs($user)
            ->get(route('account.edit'));

        $response->assertStatus(200);
        $response->assertViewHas('status');
    }

    /**
     * Test that account information can be updated.
     */
    public function test_account_information_can_be_updated(): void
    {
        $user = User::factory()->create([
            'name' => 'Old Name',
            'email' => 'old@example.com'
        ]);

        $updateData = [
            'name' => 'New Name',
            'email' => 'new@example.com'
        ];

        $this->mockService->shouldReceive('updateAccount')
            ->with($user, $updateData)
            ->andReturn(['success' => true, 'message' => 'Account updated successfully!']);

        $response = $this->actingAs($user)
            ->post(route('account.update'), $updateData);

        $response->assertRedirect(route('account.edit'));
        $response->assertSessionHas('status', 'Account updated successfully!');
    }

    /**
     * Test that password can be updated.
     */
    public function test_password_can_be_updated(): void
    {
        $user = User::factory()->create();

        $updateData = [
            'name' => $user->name,
            'email' => $user->email,
            'password' => 'newpassword123',
            'password_confirmation' => 'newpassword123'
        ];

        $this->mockService->shouldReceive('updateAccount')
            ->with($user, $updateData)
            ->andReturn(['success' => true, 'message' => 'Account updated successfully!']);

        $response = $this->actingAs($user)
            ->post(route('account.update'), $updateData);

        $response->assertRedirect(route('account.edit'));
        $response->assertSessionHas('status', 'Account updated successfully!');
    }

    /**
     * Test that validation errors are handled correctly.
     */
    public function test_validation_errors_are_handled_correctly(): void
    {
        $user = User::factory()->create();

        $updateData = [
            'name' => '',
            'email' => 'invalid-email'
        ];

        $validationException = ValidationException::withMessages([
            'name' => ['The name field is required.'],
            'email' => ['The email must be a valid email address.']
        ]);

        $this->mockService->shouldReceive('updateAccount')
            ->andThrow($validationException);

        $response = $this->actingAs($user)
            ->post(route('account.update'), $updateData);

        $response->assertSessionHasErrors(['name', 'email']);
    }

    /**
     * Test that general exceptions are handled correctly.
     */
    public function test_general_exceptions_are_handled_correctly(): void
    {
        $user = User::factory()->create();

        $updateData = [
            'name' => $user->name,
            'email' => $user->email
        ];

        $this->mockService->shouldReceive('updateAccount')
            ->andThrow(new \Exception('Database error'));

        $response = $this->actingAs($user)
            ->post(route('account.update'), $updateData);

        $response->assertSessionHas('error', 'An error occurred while updating your account.');
    }

    /**
     * Test that unauthenticated users cannot access account management.
     */
    public function test_unauthenticated_users_cannot_access_account_management(): void
    {
        $response = $this->get(route('account.edit'));
        $response->assertRedirect(route('login'));

        $response = $this->post(route('account.update'), []);
        $response->assertRedirect(route('login'));
    }
}
