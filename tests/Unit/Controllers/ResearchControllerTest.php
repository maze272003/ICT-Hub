<?php

namespace Tests\Unit\Controllers;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ResearchControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that research page renders correctly.
     */
    public function test_research_page_renders_correctly(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->get(route('dashboard.research'));

        $response->assertStatus(200);
        $response->assertViewIs('Shared/Research');
    }

    /**
     * Test that research page requires authentication.
     */
    public function test_research_page_requires_authentication(): void
    {
        $response = $this->get(route('dashboard.research'));
        $response->assertRedirect(route('login'));
    }

    /**
     * Test that research page accepts slug parameter.
     */
    public function test_research_page_accepts_slug_parameter(): void
    {
        $user = User::factory()->create();
        $slug = 'test-slug-123';

        $response = $this->actingAs($user)
            ->get("/auth/{$slug}/dashboard/research");

        $response->assertStatus(200);
        $response->assertViewIs('Shared/Research');
    }
}
