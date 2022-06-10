<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::create(['name' => 'Living Room']);
        Category::create(['name' => 'Bathroom']);
        Category::create(['name' => 'Kitchen']);
        Category::create(['name' => 'Bedroom']);
        Category::create(['name' => 'Garden']);
    }
}
