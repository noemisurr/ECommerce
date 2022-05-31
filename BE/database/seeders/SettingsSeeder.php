<?php

namespace Database\Seeders;

use App\Models\Settings;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Settings::create([
            'email' => 'fakeikea@ikea.com', 
            'address' => 'via Regolizie', 
            'city' => 'Chieti', 
            'postal_code' => '66020', 
            'telephone' => '555-555-050'
        ]);
    }
}
