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
        // 1. Run the StudentSeeder (Generates 5000 fake students)
        $this->call([
            StudentSeeder::class,
        ]);

        // 2. Create specific hardcoded accounts (Admin/Teachers)
        User::factory()->create([
            'lrn' => null, // Teachers might not need LRN
            'name' => 'Test Teacher',
            'email' => 'teacher@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
        ]);
        
        User::factory()->create([
            'lrn' => null,
            'name' => 'Ace Teacher',
            'email' => 'acepadilla@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
        ]);

        User::factory()->create([
            'lrn' => '105580090069',
            'name' => 'Test Student',
            'email' => 'jmjonatas4@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);
    }
}
