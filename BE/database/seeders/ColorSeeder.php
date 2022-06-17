<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Color;

class ColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Color::create(['name' => 'White', 'hex' => '#F2F2F2']);
        Color::create(['name' => 'Black', 'hex' => '#000000']);
        Color::create(['name' => 'Brown', 'hex' => '#A52A2A']);
        Color::create(['name' => 'Green', 'hex' => '#008000']);
        Color::create(['name' => 'Gray', 'hex' => '#808080']);
        Color::create(['name' => 'Purple', 'hex' => '#800080']);
        Color::create(['name' => 'Lavender', 'hex' => '#E3E4FA']);
        Color::create(['name' => 'Lavender', 'hex' => '#E3E4FA']);
        Color::create(['name' => 'Mint', 'hex' => '#3EB489']);
        Color::create(['name' => 'Beige', 'hex' => '#F5F5DC']);
        Color::create(['name' => 'Sand', 'hex' => '#C2B280']);
    }
}
