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
        Color::create(['name' => 'White', 'hex' => '#F2F2F2']);     // 1
        Color::create(['name' => 'Black', 'hex' => '#000000']);     // 2
        Color::create(['name' => 'Blu-Gray', 'hex' => '#6699cc']);  // 3
        Color::create(['name' => 'Green', 'hex' => '#008000']);     // 4
        Color::create(['name' => 'Gray', 'hex' => '#808080']);      // 5
        Color::create(['name' => 'Purple', 'hex' => '#800080']);    // 6 
        Color::create(['name' => 'Lavender', 'hex' => '#E3E4FA']);  // 7
        Color::create(['name' => 'Lavender', 'hex' => '#E3E4FA']);  // 8
        Color::create(['name' => 'Mint', 'hex' => '#3EB489']);      // 9
        Color::create(['name' => 'Beige', 'hex' => '#F5F5DC']);     // 10
        Color::create(['name' => 'Sand', 'hex' => '#C2B280']);      // 11
        Color::create(['name' => 'Pale Pink', 'hex' => '#FFE0E3']); // 12
        Color::create(['name' => 'Walnut', 'hex' => '#7c624a']);    // 13
        Color::create(['name' => 'Walnut', 'hex' => '#55342b']);    // 13

    }
}
