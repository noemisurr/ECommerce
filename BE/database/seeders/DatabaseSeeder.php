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

        //------------ Storage and home organization -----------------------------------------------------------------------------------------------------------------------------------------------------------
            //Dressers & storage drawers
        $prod = Product::factory()->create(['short_description' => 'Box with compartments', 'long_description' =>'Have one box for socks, another for training gear or folded sweaters. These boxes divide your storage and make good use of space. Use with other prod for complete control of your storage spaces.', 'price' => 9, 'brand' => 'IKEA', 'material' => '100% polyester (min. 90% recycled)', 'size' => '34x51x10 cm', 'other' => '', 'id_category' => 1, 'id_subcategory' => 1]);
        $name = $prod->name . ' ' .  $faker->firstName(); 
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 3, 'id_product' => $prod->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/stuk-box-with-compartments-blue-gray__1013322_pe829110_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/stuk-box-with-compartments-blue-gray__1035064_pe837973_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/stuk-box-with-compartments-blue-gray__0623086_pe690914_s5.jpg?f=s', 'id_variation' => $variation->id]);
        $name = $prod->name . ' ' .  $faker->firstName(); 
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 1, 'id_product' => $prod->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/stuk-box-with-compartments-white__0920358_pe786993_s5.jpg?f=xu', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/stuk-box-with-compartments-white__0939134_pe794417_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/stuk-box-with-compartments-white__0947494_pe798588_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/stuk-box-with-compartments-white__0954889_pe803530_s5.jpg?f=s', 'id_variation' => $variation->id]);

        $prod = Product::factory()->create(['short_description' => 'Organizer, plastic', 'long_description' =>'This slightly taller plastic box helps you make the best use of space on shelves and in drawers. Use one or several and combine different sizes to create a solution that suits your things.', 'price' => 2, 'brand' => 'IKEA', 'material' => 'Polypropylene plastic (min. 20% recycled)', 'size' => '20x25x10 cm', 'other' => '', 'id_category' => 1, 'id_subcategory' => 1]);
        $name = $prod->name . ' ' .  $faker->firstName(); 
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 10, 'id_product' => $prod->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/nojig-organizer-plastic-beige__0954730_pe804516_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/nojig-organizer-plastic-beige__0954732_pe804518_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/nojig-organizer-plastic-beige__0954158_pe804500_s5.jpg?f=s', 'id_variation' => $variation->id]);

        $prod = Product::factory()->create(['short_description' => '3-drawer chest', 'long_description' =>'Use throughout the home, on its own or with other furniture in the HAUGA series. In this chest with 3 drawers you can store everything from towels to clothes - and why not put a lamp or a flower on top?', 'price' => 159, 'brand' => 'IKEA', 'material' => 'Particleboard, Acrylic paint, Plastic edging', 'size' => '70x84 cm', 'other' => '', 'id_category' => 1, 'id_subcategory' => 1]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 1, 'id_product' => $prod->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/hauga-3-drawer-chest-white__0898777_pe782647_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/hauga-3-drawer-chest-white__0931910_pe791300_s5.jpg?f=xl', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/hauga-3-drawer-chest-white__0931911_pe791301_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/hauga-3-drawer-chest-white__0939473_pe794568_s5.jpg?f=s', 'id_variation' => $variation->id]);
        $name = $prod->name . ' ' .  $faker->firstName(); 
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 5, 'id_product' => $prod->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/hauga-3-drawer-chest-gray__0898775_pe782646_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/pvid/0970377_fe001210.jpg', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/hauga-3-drawer-chest-gray__0931906_pe791296_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/hauga-3-drawer-chest-gray__0931907_pe791297_s5.jpg?f=s', 'id_variation' => $variation->id]);

            // Wardrobes & closets
        $prod = Product::factory()->create(['short_description' => 'Wardrobe combination', 'long_description' =>'Keep it simple. Here is a basic solution to get you started, and space for more interiors if you want to upgrade.', 'price' => 1225, 'brand' => 'IKEA', 'material' => 'Particleboard, Fiberboard, ABS plastic, Polypropylene, Foil', 'size' => '200x66x236 cm', 'other' => '10 year limited warranty', 'id_category' => 1, 'id_subcategory' => 2]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 1, 'id_product' => $prod->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/pax-hokksund-wardrobe-combination-white-high-gloss-light-gray__0935337_pe792737_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/pax-hokksund-wardrobe-combination-white-high-gloss-light-gray__0935369_pe792786_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/pax-hokksund-wardrobe-combination-white-high-gloss-light-gray__0758651_pe749945_s5.jpg?f=xl', 'id_variation' => $variation->id]);

        $prod = Product::factory()->create(['short_description' => 'Wardrobe with 2 clothes rails', 'long_description' =>'This wardrobe fits a lot in a small space - from a baby is onesies to a teenagers jeans. On the clothes rails there’s room for hangers, and on the hooks your child can hang their clothes on their own.', 'price' => 287, 'brand' => 'IKEA', 'material' => 'Particle- and fibreboard with honeycomb paper filling (100% recycled paper), Paper foil, Paper foil, Plastic edging', 'size' => '60x63x196 cm', 'other' => '', 'id_category' => 1, 'id_subcategory' => 2]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 1, 'id_product' => $prod->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/smastad-uppfoera-wardrobe-white-white-with-2-clothes-rails__0925757_pe788864_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/smastad-uppfoera-wardrobe-white-white-with-2-clothes-rails__0936497_pe793270_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/smastad-uppfoera-wardrobe-white-white-with-2-clothes-rails__1008778_pe827319_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/smastad-uppfoera-wardrobe-white-white-with-2-clothes-rails__0939268_pe794494_s5.jpg?f=s', 'id_variation' => $variation->id]);
        $name = $prod->name . ' ' .  $faker->firstName(); 
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 4, 'id_product' => $prod->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/smastad-uppfoera-wardrobe-white-green-with-2-clothes-rails__0925761_pe788868_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/smastad-uppfoera-wardrobe-white-green-with-2-clothes-rails__0936494_pe793267_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/smastad-uppfoera-wardrobe-white-green-with-2-clothes-rails__0945149_pe797579_s5.jpg?f=s', 'id_variation' => $variation->id]);

        $prod = Product::factory()->create(['short_description' => 'Wardrobe with 3 shelves', 'long_description' =>'', 'price' => 243, 'brand' => 'IKEA', 'material' => 'Particle- and fibreboard with honeycomb paper filling (100% recycled paper), Paper foil, Paper foil, Plastic edging', 'size' => '60x63x136 cm', 'other' => 'Knobs and handles are sold separately.', 'id_category' => 1, 'id_subcategory' => 2]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 12, 'id_product' => $prod->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/smastad-uppfoera-wardrobe-white-pale-pink-with-3-shelves__1099945_pe866011_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/smastad-uppfoera-wardrobe-white-pale-pink-with-3-shelves__1120086_pe873716_s5.jpg?f=s', 'id_variation' => $variation->id]);
        $name = $prod->name . ' ' .  $faker->firstName(); 
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 1, 'id_product' => $prod->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/smastad-uppfoera-wardrobe-white-with-frame-with-3-shelves__1099952_pe866018_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/smastad-uppfoera-wardrobe-white-with-frame-with-3-shelves__1120093_pe873720_s5.jpg?f=s', 'id_variation' => $variation->id]);
        $name = $prod->name . ' ' .  $faker->firstName(); 
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 4, 'id_product' => $prod->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/smastad-uppfoera-wardrobe-white-green-with-3-shelves__1099963_pe866025_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/smastad-uppfoera-wardrobe-white-green-with-3-shelves__1120112_pe873733_s5.jpg?f=s', 'id_variation' => $variation->id]);

            // Sideboards, buffets & sofa tables
        $prod = Product::factory()->create(['short_description' => 'Storage combination w doors/drawers, walnut effect light gray/Lappviken walnut effect light gray', 'long_description' =>'Go ahead and put things aside for a while! A sideboard combination gives you plenty of space to store things and a surface to create an attractive display - or to unload serving dishes while you eat.', 'price' => 270, 'brand' => 'IKEA', 'material' => 'Particleboard, Honeycomb structure paper filling (100% recycled), Fiberboard, Paper foil, Plastic edging, Plastic edging, Plastic edging, Paper foil', 'size' => '120x42x65 cm', 'other' => '', 'id_category' => 1, 'id_subcategory' => 3]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 13, 'id_product' => $prod->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/besta-storage-combination-w-doors-drawers-walnut-effect-light-gray-lappviken-walnut-effect-light-gray__0780706_pe760204_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/besta-storage-combination-w-doors-drawers-walnut-effect-light-gray-lappviken-walnut-effect-light-gray__0999313_pe823425_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/besta-storage-combination-w-doors-drawers-walnut-effect-light-gray-lappviken-walnut-effect-light-gray__1026860_pe834593_s5.jpg?f=s', 'id_variation' => $variation->id]);

        $prod = Product::factory()->create(['short_description' => 'Sideboard', 'long_description' =>'A stylish piece of furniture in walnut veneer with a focus on simplicity. And you avoid needing handles or knobs thanks to the push openers.', 'price' => 599, 'brand' => 'IKEA', 'material' => 'Particleboard, Walnut veneer, Clear acrylic lacquer, Paper foil, Walnut veneer, Paper edging', 'size' => '160x81 cm', 'other' => '', 'id_category' => 1, 'id_subcategory' => 3]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 1, 'id_product' => $prod->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/stockholm-sideboard-walnut-veneer__0625359_pe692210_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/stockholm-sideboard-walnut-veneer__1091969_pe862596_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/stockholm-sideboard-walnut-veneer__1091970_pe862595_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/stockholm-sideboard-walnut-veneer__0211710_pe365381_s5.jpg?f=s', 'id_variation' => $variation->id]);

        $prod = Product::factory()->create(['short_description' => 'Sideboard, birch effect', 'long_description' =>'Thin clean lines, a natural birch look and solid wood details. With ERSNÄS sideboard you get the best of modern Scandinavian design - simple elegance, timeless quality and well-thought-out functionality.', 'price' => 399, 'brand' => 'IKEA', 'material' => 'Particleboard, Paper foil, Plastic edging', 'size' => '180x79 cm', 'other' => '', 'id_category' => 1, 'id_subcategory' => 3]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 10, 'id_product' => $prod->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/ersnaes-sideboard-birch-effect__1016125_pe830223_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/ersnaes-sideboard-birch-effect__1028603_pe835415_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/ersnaes-sideboard-birch-effect__1028604_pe835416_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/ersnaes-sideboard-birch-effect__1028607_pe835417_s5.jpg?f=s', 'id_variation' => $variation->id]);

        //TODO: aggiungere TAG!!
        // -------------------- Textiles --------------------------------------------------------------------------------------------------------------------------------------------------------
        // $prod = Product::factory()->create(['short_description' => '', 'long_description' =>'', 'price' => '', 'brand' => '', 'id_category' => 1, 'id_subcategory' => 1]);
        // $prod = Product::factory()->create(['short_description' => '', 'long_description' =>'', 'price' => '', 'brand' => '', 'id_category' => 1, 'id_subcategory' => 2]);
        // $prod = Product::factory()->create(['short_description' => '', 'long_description' =>'', 'price' => '', 'brand' => '', 'id_category' => 1, 'id_subcategory' => 3]);
        // // Home decor
        // $prod = Product::factory()->create(['short_description' => '', 'long_description' =>'', 'price' => '', 'brand' => '', 'id_category' => 1, 'id_subcategory' => 1]);
        // $prod = Product::factory()->create(['short_description' => '', 'long_description' =>'', 'price' => '', 'brand' => '', 'id_category' => 1, 'id_subcategory' => 2]);
        // $prod = Product::factory()->create(['short_description' => '', 'long_description' =>'', 'price' => '', 'brand' => '', 'id_category' => 1, 'id_subcategory' => 3]);
        // // Lighting
        // $prod = Product::factory()->create(['short_description' => '', 'long_description' =>'', 'price' => '', 'brand' => '', 'id_category' => 1, 'id_subcategory' => 1]);
        // $prod = Product::factory()->create(['short_description' => '', 'long_description' =>'', 'price' => '', 'brand' => '', 'id_category' => 1, 'id_subcategory' => 2]);
        // $prod = Product::factory()->create(['short_description' => '', 'long_description' =>'', 'price' => '', 'brand' => '', 'id_category' => 1, 'id_subcategory' => 3]);
        // // Outdoor
        // $prod = Product::factory()->create(['short_description' => '', 'long_description' =>'', 'price' => '', 'brand' => '', 'id_category' => 1, 'id_subcategory' => 1]);
        // $prod = Product::factory()->create(['short_description' => '', 'long_description' =>'', 'price' => '', 'brand' => '', 'id_category' => 1, 'id_subcategory' => 2]);
        // $prod = Product::factory()->create(['short_description' => '', 'long_description' =>'', 'price' => '', 'brand' => '', 'id_category' => 1, 'id_subcategory' => 3]);
        // // Pots & plants 
        // $prod = Product::factory()->create(['short_description' => '', 'long_description' =>'', 'price' => '', 'brand' => '', 'id_category' => 1, 'id_subcategory' => 1]);
        // $prod = Product::factory()->create(['short_description' => '', 'long_description' =>'', 'price' => '', 'brand' => '', 'id_category' => 1, 'id_subcategory' => 2]);
        // $prod = Product::factory()->create(['short_description' => '', 'long_description' =>'', 'price' => '', 'brand' => '', 'id_category' => 1, 'id_subcategory' => 3]);
        // // Kitchen & appliances
        // $prod = Product::factory()->create(['short_description' => '', 'long_description' =>'', 'price' => '', 'brand' => '', 'id_category' => 1, 'id_subcategory' => 1]);
        // $prod = Product::factory()->create(['short_description' => '', 'long_description' =>'', 'price' => '', 'brand' => '', 'id_category' => 1, 'id_subcategory' => 2]);
        // $prod = Product::factory()->create(['short_description' => '', 'long_description' =>'', 'price' => '', 'brand' => '', 'id_category' => 1, 'id_subcategory' => 3]);
        // // Bathroom
        // $prod = Product::factory()->create(['short_description' => '', 'long_description' =>'', 'price' => '', 'brand' => '', 'id_category' => 1, 'id_subcategory' => 1]);
        // $prod = Product::factory()->create(['short_description' => '', 'long_description' =>'', 'price' => '', 'brand' => '', 'id_category' => 1, 'id_subcategory' => 2]);
        // $prod = Product::factory()->create(['short_description' => '', 'long_description' =>'', 'price' => '', 'brand' => '', 'id_category' => 1, 'id_subcategory' => 3]);
        // // Home electronics
        // $prod = Product::factory()->create(['short_description' => '', 'long_description' =>'', 'price' => '', 'brand' => '', 'id_category' => 1, 'id_subcategory' => 1]);
        // $prod = Product::factory()->create(['short_description' => '', 'long_description' =>'', 'price' => '', 'brand' => '', 'id_category' => 1, 'id_subcategory' => 2]);
        // $prod = Product::factory()->create(['short_description' => '', 'long_description' =>'', 'price' => '', 'brand' => '', 'id_category' => 1, 'id_subcategory' => 3]);
        // // Pets
        // $prod = Product::factory()->count(15)->create(['id_category' => 10]);
    }
}
