<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test student',
            'email' => 'jmjonatas4@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);

        User::factory()->create([
            'name' => 'Test teacher',
            'email' => 'teacher@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
        ]);
    }
}
