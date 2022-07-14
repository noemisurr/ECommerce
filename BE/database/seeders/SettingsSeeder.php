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
            'address' => 'via cortea dei gigli 88',
            'city' => 'Chieti', 
            'postal_code' => '80920', 
            'telephone' => '0538 92 73 092',
            'info' => 'One brand, many companies, and many, many people – that’s us in a nutshell. Spread all over the world, we have a passion for home furnishing and an inspiring shared vision: to create a better everyday life for the many people. This, together with our straightforward business idea, shared values, and a culture based on the spirit of togetherness, guides us in everything we do.'
        ]);
    }
}
