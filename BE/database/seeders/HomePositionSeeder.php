<?php

namespace Database\Seeders;

use App\Models\HomePositionModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HomePositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        HomePositionModel::create(['name' => 'background']);
        HomePositionModel::create(['name' => 'slide']);
        HomePositionModel::create(['name' => 'other']);
    }
}
