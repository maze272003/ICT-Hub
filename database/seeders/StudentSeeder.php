<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Generate 5000 random students efficiently
        $this->command->info('Creating 5000 students using Faker...');

        User::factory()->count(5000)->create([
            'role' => 'student', // Ensure they are students
        ]);
        
        $this->command->info('5000 students created successfully!');
    }
}
