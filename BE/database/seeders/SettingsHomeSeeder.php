<?php

namespace Database\Seeders;

use App\Models\SettingsHome;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingsHomeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // img sfondo sito
        SettingsHome::create(['id_position' => '1', 'src' => 'https://angular.pixelstrap.com/multikart/assets/images/parallax/5.jpg']);

        // img slides
        SettingsHome::create(['id_position' => '1', 'src' => 'https://angular.pixelstrap.com/multikart/assets/images/slider/12.jpg']);
        SettingsHome::create(['id_position' => '1', 'src' => 'https://angular.pixelstrap.com/multikart/assets/images/slider/13.jpg']);

        // img sconti
        SettingsHome::create(['id_position' => '1', 'src' => 'https://angular.pixelstrap.com/multikart/assets/images/collection/furniture/1.jpg']);
        SettingsHome::create(['id_position' => '1', 'src' => 'https://angular.pixelstrap.com/multikart/assets/images/collection/furniture/2.jpg']);
        SettingsHome::create(['id_position' => '1', 'src' => 'https://angular.pixelstrap.com/multikart/assets/images/collection/furniture/3.jpg']);

    }
}
