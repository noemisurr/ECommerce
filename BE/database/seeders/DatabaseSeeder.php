<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        User::factory()->create(['email'=>'sadmin@enterprise-consulting.it', 'id_user_type'=>1]);
        Product::factory()->count(5)->create();
    }
}
