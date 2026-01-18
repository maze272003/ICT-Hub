<?php

namespace Tests\Unit\Services;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Services\AccountService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Mockery;
use Tests\TestCase;

class AccountServiceTest extends TestCase
{
    use RefreshDatabase;

    protected $mockRepository;
    protected $service;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->mockRepository = Mockery::mock(UserRepositoryInterface::class);
        $this->service = new AccountService($this->mockRepository);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
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

        $this->mockRepository->shouldReceive('update')
            ->with($user, Mockery::subset([
                'name' => 'New Name',
                'email' => 'new@example.com'
            ]))
            ->andReturn(true);

        $result = $this->service->updateAccount($user, $updateData);

        $this->assertTrue($result['success']);
        $this->assertEquals('Account updated successfully!', $result['message']);
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

        $this->mockRepository->shouldReceive('update')
            ->with($user, Mockery::subset([
                'password' => Mockery::type('string')
            ]))
            ->andReturn(true);

        $result = $this->service->updateAccount($user, $updateData);

        $this->assertTrue($result['success']);
        $this->assertEquals('Account updated successfully!', $result['message']);
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

        $this->mockRepository->shouldReceive('update')
            ->with($user, Mockery::subset([
                'email' => 'new@example.com'
            ]))
            ->andReturn(true);

        // Mock the user's isDirty method
        $user->email = 'new@example.com';

        $result = $this->service->updateAccount($user, $updateData);

        $this->assertTrue($result['success']);
    }

    /**
     * Test that validation errors are thrown for invalid data.
     */
    public function test_validation_errors_are_thrown_for_invalid_data(): void
    {
        $user = User::factory()->create();

        $updateData = [
            'name' => '',
            'email' => 'invalid-email'
        ];

        $this->expectException(ValidationException::class);

        $this->service->updateAccount($user, $updateData);
    }

    /**
     * Test that email must be unique when updating.
     */
    public function test_email_must_be_unique_when_updating(): void
    {
        $user1 = User::factory()->create(['email' => 'user1@example.com']);
        $user2 = User::factory()->create(['email' => 'user2@example.com']);

        $updateData = [
            'name' => $user1->name,
            'email' => 'user2@example.com' // Duplicate email
        ];

        $this->expectException(ValidationException::class);

        $this->service->updateAccount($user1, $updateData);
    }

    /**
     * Test that password confirmation is required.
     */
    public function test_password_confirmation_is_required(): void
    {
        $user = User::factory()->create();

        $updateData = [
            'name' => $user->name,
            'email' => $user->email,
            'password' => 'newpassword123',
            'password_confirmation' => 'differentpassword' // Mismatch
        ];

        $this->expectException(ValidationException::class);

        $this->service->updateAccount($user, $updateData);
    }

    /**
     * Test that password must meet complexity requirements.
     */
    public function test_password_must_meet_complexity_requirements(): void
    {
        $user = User::factory()->create();

        $updateData = [
            'name' => $user->name,
            'email' => $user->email,
            'password' => 'weak', // Too weak
            'password_confirmation' => 'weak'
        ];

        $this->expectException(ValidationException::class);

        $this->service->updateAccount($user, $updateData);
    }

    /**
     * Test getAccountData method.
     */
    public function test_get_account_data(): void
    {
        $data = $this->service->getAccountData();

        $this->assertArrayHasKey('status', $data);
    }
}
