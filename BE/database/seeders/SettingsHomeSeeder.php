<?php

namespace Database\Seeders;

use App\Models\SettingsHome;
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
        SettingsHome::create(['name' => 'A', 'url' => 'https://angular.pixelstrap.com/multikart/assets/images/parallax/5.jpg', 'id_position' => 1]);

        // img slides 
        SettingsHome::create(['name' => 'B', 'url' => 'https://angular.pixelstrap.com/multikart/assets/images/slider/12.jpg', 'id_position' => 2]);
        SettingsHome::create(['name' => 'C', 'url' => 'https://angular.pixelstrap.com/multikart/assets/images/slider/13.jpg', 'id_position' => 2]);

        // img sconti
        SettingsHome::create(['name' => 'D', 'url' => 'https://angular.pixelstrap.com/multikart/assets/images/collection/furniture/1.jpg', 'id_position' => 3]);
        SettingsHome::create(['name' => 'E', 'url' => 'https://angular.pixelstrap.com/multikart/assets/images/collection/furniture/2.jpg', 'id_position' => 3]);
        SettingsHome::create(['name' => 'F', 'url' => 'https://angular.pixelstrap.com/multikart/assets/images/collection/furniture/3.jpg', 'id_position' => 3]);

    }
}
