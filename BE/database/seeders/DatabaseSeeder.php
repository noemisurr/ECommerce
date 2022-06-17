<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\Variation;
use App\Models\Img;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // User::factory()->create(['email'=>'sadmin@enterprise-consulting.it', 'id_user_type'=>1]);
        // User::factory()->create(['email'=>'noemi@test.com']);
        // User::factory()->create(['email'=>'simone@test.com']);
        // User::factory()->create(['email'=>'vincenzo@test.com']);
        $products = Product::factory()->count(20)->create();
        foreach($products as $prod){
            $name = $prod->name . ' ' .  $faker->firstName(); 
            $variation = Variation::factory()->create(['name' => $name, 'id_product' => $prod->id]);
            Img::factory()->create(['url' => 'https://angular.pixelstrap.com/multikart/assets/images/product/furniture/2.jpg', 'id_variation' => $variation->id]);
            Img::factory()->create(['url' => 'https://angular.pixelstrap.com/multikart/assets/images/product/furniture/2.jpg', 'id_variation' => $variation->id]);
            Img::factory()->create(['url' => 'https://angular.pixelstrap.com/multikart/assets/images/product/furniture/2.jpg', 'id_variation' => $variation->id]);
            $name = $prod->name . ' ' .  $faker->firstName(); 
            $variation = Variation::factory()->create(['name' => $name, 'id_product' => $prod->id]);
            Img::factory()->create(['url' => 'https://angular.pixelstrap.com/multikart/assets/images/product/furniture/7.jpg', 'id_variation' => $variation->id]);
            Img::factory()->create(['url' => 'https://angular.pixelstrap.com/multikart/assets/images/product/furniture/7.jpg', 'id_variation' => $variation->id]);
            Img::factory()->create(['url' => 'https://angular.pixelstrap.com/multikart/assets/images/product/furniture/7.jpg', 'id_variation' => $variation->id]);
            $name = $prod->name . ' ' .  $faker->firstName(); 
            $variation = Variation::factory()->create(['name' => $name, 'id_product' => $prod->id]);  
            Img::factory()->create(['url' => 'https://angular.pixelstrap.com/multikart/assets/images/product/furniture/19.jpg', 'id_variation' => $variation->id]);
            Img::factory()->create(['url' => 'https://angular.pixelstrap.com/multikart/assets/images/product/furniture/19.jpg', 'id_variation' => $variation->id]);
            Img::factory()->create(['url' => 'https://angular.pixelstrap.com/multikart/assets/images/product/furniture/19.jpg', 'id_variation' => $variation->id]);
        }
    }
}
