<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Discount;

class DiscountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Discount::create(['name' => 'Autumn Sales', 'description' => 'Autumn Sales', 'value' => 30, 'active' => false]);
        Discount::create(['name' => 'Winter Sales', 'description' => 'Winter Sales', 'value' => 10, 'active' => false]);
        Discount::create(['name' => 'Summer Sales', 'description' => 'Summer Sales', 'value' => 50, 'active' => false]);
        Discount::create(['name' => 'Spring Sales', 'description' => 'Spring Sales', 'value' => 20, 'active' => false]);
    }

}
