<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\AverageScores;
use App\Models\History;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Leons Aleksandrovs',
            'email' => 'skrazzo@proton.me',
            'password' => 'labdien',
        ]);

        User::factory(40)
            ->has(History::factory(100))
            ->has(AverageScores::factory(100), 'average')
            ->create();
    }
}
