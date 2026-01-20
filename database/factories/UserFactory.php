<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            // Generate a random 12-digit LRN as per your validation rules
            'lrn' => fake()->numerify('############'), 
            'password' => static fn () => Hash::make('password'),
            'remember_token' => Str::random(10),
            'role' => 'student', // Default role for factory
        ];
    }
}
