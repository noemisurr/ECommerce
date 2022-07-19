<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Tag;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Color
        Tag::create(['name' => 'White']);       // 1
        Tag::create(['name' => 'Black']);       // 2
        Tag::create(['name' => 'Blu-Gray']);    // 3
        Tag::create(['name' => 'Green']);       // 4
        Tag::create(['name' => 'Gray']);        // 5
        Tag::create(['name' => 'Purple']);      // 6 
        Tag::create(['name' => 'Lavender']);    // 7
        Tag::create(['name' => 'Teal']);        // 8
        Tag::create(['name' => 'Mint']);        // 9
        Tag::create(['name' => 'Beige']);        // 10
        Tag::create(['name' => 'Sand']);        // 11
        Tag::create(['name' => 'Pale Pink']);    // 12
        Tag::create(['name' => 'Walnut']);      // 13
        Tag::create(['name' => 'Gold']);        // 14
        Tag::create(['name' => 'Brown']);        // 15

        // Category
        Tag::create(['name' => 'Storage and home organization']);        // 15
        Tag::create(['name' => 'Textiles']);        // 16
        Tag::create(['name' => 'Home decor']);        // 17
        Tag::create(['name' => 'Lighting']);        // 18
        Tag::create(['name' => 'Outdoor']);        // 19
        Tag::create(['name' => 'Pots & plants']);        // 20
        Tag::create(['name' => 'Kitchen & appliances']);        // 21
        Tag::create(['name' => 'Bathroom']);        // 22
        Tag::create(['name' => 'Home electronics']);        // 23
        Tag::create(['name' => 'Pets']);        // 24

        // Sub
        Tag::create(['name' => 'Brown']);        // 25
        Tag::create(['name' => 'Brown']);        // 26

    }
}
