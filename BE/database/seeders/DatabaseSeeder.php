<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\Variation;
use App\Models\Img;
use App\Models\VariationTag;
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
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 15, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/stuk-box-with-compartments-white__0920358_pe786993_s5.jpg?f=xu', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/stuk-box-with-compartments-white__0939134_pe794417_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/stuk-box-with-compartments-white__0947494_pe798588_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/stuk-box-with-compartments-white__0954889_pe803530_s5.jpg?f=s', 'id_variation' => $variation->id]);

        $prod = Product::factory()->create(['short_description' => 'Organizer, plastic', 'long_description' =>'This slightly taller plastic box helps you make the best use of space on shelves and in drawers. Use one or several and combine different sizes to create a solution that suits your things.', 'price' => 2, 'brand' => 'IKEA', 'material' => 'Polypropylene plastic (min. 20% recycled)', 'size' => '20x25x10 cm', 'other' => '', 'id_category' => 1, 'id_subcategory' => 1]);
        $name = $prod->name . ' ' .  $faker->firstName(); 
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 10, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 15, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/nojig-organizer-plastic-beige__0954730_pe804516_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/nojig-organizer-plastic-beige__0954732_pe804518_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/nojig-organizer-plastic-beige__0954158_pe804500_s5.jpg?f=s', 'id_variation' => $variation->id]);

        $prod = Product::factory()->create(['short_description' => '3-drawer chest', 'long_description' =>'Use throughout the home, on its own or with other furniture in the HAUGA series. In this chest with 3 drawers you can store everything from towels to clothes - and why not put a lamp or a flower on top?', 'price' => 159, 'brand' => 'IKEA', 'material' => 'Particleboard, Acrylic paint, Plastic edging', 'size' => '70x84 cm', 'other' => '', 'id_category' => 1, 'id_subcategory' => 1]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 1, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 15, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/hauga-3-drawer-chest-white__0898777_pe782647_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/hauga-3-drawer-chest-white__0931910_pe791300_s5.jpg?f=xl', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/hauga-3-drawer-chest-white__0931911_pe791301_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/hauga-3-drawer-chest-white__0939473_pe794568_s5.jpg?f=s', 'id_variation' => $variation->id]);
        $name = $prod->name . ' ' .  $faker->firstName(); 
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 5, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 15, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/hauga-3-drawer-chest-gray__0898775_pe782646_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/pvid/0970377_fe001210.jpg', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/hauga-3-drawer-chest-gray__0931906_pe791296_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/hauga-3-drawer-chest-gray__0931907_pe791297_s5.jpg?f=s', 'id_variation' => $variation->id]);

            // Wardrobes & closets
        $prod = Product::factory()->create(['short_description' => 'Wardrobe combination', 'long_description' =>'Keep it simple. Here is a basic solution to get you started, and space for more interiors if you want to upgrade.', 'price' => 1225, 'brand' => 'IKEA', 'material' => 'Particleboard, Fiberboard, ABS plastic, Polypropylene, Foil', 'size' => '200x66x236 cm', 'other' => '10 year limited warranty', 'id_category' => 1, 'id_subcategory' => 2]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 1, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 15, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/pax-hokksund-wardrobe-combination-white-high-gloss-light-gray__0935337_pe792737_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/pax-hokksund-wardrobe-combination-white-high-gloss-light-gray__0935369_pe792786_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/pax-hokksund-wardrobe-combination-white-high-gloss-light-gray__0758651_pe749945_s5.jpg?f=xl', 'id_variation' => $variation->id]);

        $prod = Product::factory()->create(['short_description' => 'Wardrobe with 2 clothes rails', 'long_description' =>'This wardrobe fits a lot in a small space - from a baby is onesies to a teenagers jeans. On the clothes rails there’s room for hangers, and on the hooks your child can hang their clothes on their own.', 'price' => 287, 'brand' => 'IKEA', 'material' => 'Particle- and fibreboard with honeycomb paper filling (100% recycled paper), Paper foil, Paper foil, Plastic edging', 'size' => '60x63x196 cm', 'other' => '', 'id_category' => 1, 'id_subcategory' => 2]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 1, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 15, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/smastad-uppfoera-wardrobe-white-white-with-2-clothes-rails__0925757_pe788864_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/smastad-uppfoera-wardrobe-white-white-with-2-clothes-rails__0936497_pe793270_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/smastad-uppfoera-wardrobe-white-white-with-2-clothes-rails__1008778_pe827319_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/smastad-uppfoera-wardrobe-white-white-with-2-clothes-rails__0939268_pe794494_s5.jpg?f=s', 'id_variation' => $variation->id]);
        $name = $prod->name . ' ' .  $faker->firstName(); 
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 4, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 15, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/smastad-uppfoera-wardrobe-white-green-with-2-clothes-rails__0925761_pe788868_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/smastad-uppfoera-wardrobe-white-green-with-2-clothes-rails__0936494_pe793267_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/smastad-uppfoera-wardrobe-white-green-with-2-clothes-rails__0945149_pe797579_s5.jpg?f=s', 'id_variation' => $variation->id]);

        $prod = Product::factory()->create(['short_description' => 'Wardrobe with 3 shelves', 'long_description' =>'', 'price' => 243, 'brand' => 'IKEA', 'material' => 'Particle- and fibreboard with honeycomb paper filling (100% recycled paper), Paper foil, Paper foil, Plastic edging', 'size' => '60x63x136 cm', 'other' => 'Knobs and handles are sold separately.', 'id_category' => 1, 'id_subcategory' => 2]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 12, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 15, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/smastad-uppfoera-wardrobe-white-pale-pink-with-3-shelves__1099945_pe866011_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/smastad-uppfoera-wardrobe-white-pale-pink-with-3-shelves__1120086_pe873716_s5.jpg?f=s', 'id_variation' => $variation->id]);
        $name = $prod->name . ' ' .  $faker->firstName(); 
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 1, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 15, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/smastad-uppfoera-wardrobe-white-with-frame-with-3-shelves__1099952_pe866018_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/smastad-uppfoera-wardrobe-white-with-frame-with-3-shelves__1120093_pe873720_s5.jpg?f=s', 'id_variation' => $variation->id]);
        $name = $prod->name . ' ' .  $faker->firstName(); 
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 4, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/smastad-uppfoera-wardrobe-white-green-with-3-shelves__1099963_pe866025_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/smastad-uppfoera-wardrobe-white-green-with-3-shelves__1120112_pe873733_s5.jpg?f=s', 'id_variation' => $variation->id]);

            // Sideboards, buffets & sofa tables
        $prod = Product::factory()->create(['short_description' => 'Storage combination w doors/drawers, walnut effect light gray/Lappviken walnut effect light gray', 'long_description' =>'Go ahead and put things aside for a while! A sideboard combination gives you plenty of space to store things and a surface to create an attractive display - or to unload serving dishes while you eat.', 'price' => 270, 'brand' => 'IKEA', 'material' => 'Particleboard, Honeycomb structure paper filling (100% recycled), Fiberboard, Paper foil, Plastic edging, Plastic edging, Plastic edging, Paper foil', 'size' => '120x42x65 cm', 'other' => '', 'id_category' => 1, 'id_subcategory' => 3]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 13, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 15, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/besta-storage-combination-w-doors-drawers-walnut-effect-light-gray-lappviken-walnut-effect-light-gray__0780706_pe760204_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/besta-storage-combination-w-doors-drawers-walnut-effect-light-gray-lappviken-walnut-effect-light-gray__0999313_pe823425_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/besta-storage-combination-w-doors-drawers-walnut-effect-light-gray-lappviken-walnut-effect-light-gray__1026860_pe834593_s5.jpg?f=s', 'id_variation' => $variation->id]);

        $prod = Product::factory()->create(['short_description' => 'Sideboard', 'long_description' =>'A stylish piece of furniture in walnut veneer with a focus on simplicity. And you avoid needing handles or knobs thanks to the push openers.', 'price' => 599, 'brand' => 'IKEA', 'material' => 'Particleboard, Walnut veneer, Clear acrylic lacquer, Paper foil, Walnut veneer, Paper edging', 'size' => '160x81 cm', 'other' => '', 'id_category' => 1, 'id_subcategory' => 3]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 1, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 15, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/stockholm-sideboard-walnut-veneer__0625359_pe692210_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/stockholm-sideboard-walnut-veneer__1091969_pe862596_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/stockholm-sideboard-walnut-veneer__1091970_pe862595_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/stockholm-sideboard-walnut-veneer__0211710_pe365381_s5.jpg?f=s', 'id_variation' => $variation->id]);

        $prod = Product::factory()->create(['short_description' => 'Sideboard, birch effect', 'long_description' =>'Thin clean lines, a natural birch look and solid wood details. With ERSNÄS sideboard you get the best of modern Scandinavian design - simple elegance, timeless quality and well-thought-out functionality.', 'price' => 399, 'brand' => 'IKEA', 'material' => 'Particleboard, Paper foil, Plastic edging', 'size' => '180x79 cm', 'other' => '', 'id_category' => 1, 'id_subcategory' => 3]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 10, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 15, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/ersnaes-sideboard-birch-effect__1016125_pe830223_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/ersnaes-sideboard-birch-effect__1028603_pe835415_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/ersnaes-sideboard-birch-effect__1028604_pe835416_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/ersnaes-sideboard-birch-effect__1028607_pe835417_s5.jpg?f=s', 'id_variation' => $variation->id]);

            // Textiles 
        $prod = Product::factory()->create(['short_description' => 'Duvet, cooler', 'long_description' =>'A thinner duvet that keeps you comfy and cool. It can be washed frequently and at high temperatures - and it dries quickly too.', 'price' => 14.99, 'brand' => 'IKEA', 'material' => '100 % polypropylene', 'size' => 'Large', 'other' => '', 'id_category' => 2, 'id_subcategory' => 4]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 1, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 16, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/myskgraes-duvet-cooler__0210005_pe363457_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/myskgraes-duvet-cooler__0210005_pe363457_s5.jpg?f=s', 'id_variation' => $variation->id]);
        
        $prod = Product::factory()->create(['short_description' => 'Curtains, 1 pair', 'long_description' =>'A perfect solution when you want privacy or want to block annoying glares on TV and computer screens. The outside light still comes through and creates a cozy atmosphere in the room.', 'price' => 24.99, 'brand' => 'IKEA', 'material' => '100 % polyester', 'size' => '140x250 cm', 'other' => '', 'id_category' => 2, 'id_subcategory' => 5]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 1, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 16, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/hilja-curtains-1-pair-white__0627420_pe693352_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/hilja-curtains-1-pair-white__0818949_pe774668_s5.jpg?f=s', 'id_variation' => $variation->id]);

        $prod = Product::factory()->create(['short_description' => 'Bath sheet, anthracite', 'long_description' =>'A lovely spa feeling with distinct waffle texture on one side and soft terry on the other so you can choose the comfort and look that suits you. Highly absorbent and made from sustainably-sourced cotton.', 'price' => 16.99, 'brand' => 'IKEA', 'material' => '100 % cotton', 'size' => '39x59 cm', 'other' => '', 'id_category' => 2, 'id_subcategory' => 6]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 1, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 16, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/salvike…ath-sheet-anthracite__0605467_pe681752_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/salvike…ath-sheet-anthracite__0886079_pe642375_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/salvike…ath-sheet-anthracite__0885425_pe642386_s5.jpg?f=s', 'id_variation' => $variation->id]);
        
        // Home decor
        $prod = Product::factory()->create(['short_description' => 'Mirror, gold-colour', 'long_description' =>'By decorating with mirrors, you add depth to a room and give it more life. LINDBYN mirror with rounded corners has a soft expression and the gold-coloured frame and neat design feel elegant.', 'price' => 69.99, 'brand' => 'IKEA', 'material' => 'Glass', 'size' => '60x120 cm', 'other' => '', 'id_category' => 3, 'id_subcategory' => 7]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 14, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 17, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/lindbyn-mirror-gold-colour__0956577_pe804709_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/lindbyn-mirror-gold-colour__0956579_pe804710_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/lindbyn-mirror-gold-colour__0956578_pe804711_s5.jpg?f=s', 'id_variation' => $variation->id]);
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 2, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 17, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/lindbyn-mirror-black__0798821_pe767397_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/lindbyn-mirror-black__1031830_pe836658_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/lindbyn-mirror-black__1031830_pe836658_s5.jpg?f=s', 'id_variation' => $variation->id]);

        $prod = Product::factory()->create(['short_description' => 'Tealight holder', 'long_description' =>'A timeless and elegant design makes FINSMAK tealight holder easy to use and combine with other products.', 'price' => 0.49, 'brand' => 'IKEA', 'material' => 'glass', 'size' => '3.5 cm', 'other' => '', 'id_category' => 3, 'id_subcategory' => 8]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 1, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 17, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/finsmak-tealight-holder-clear-glass__0940797_pe795200_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/finsmak-tealight-holder-clear-glass__0966528_pe809828_s5.jpg?f=s', 'id_variation' => $variation->id]);
        
        
        $prod = Product::factory()->create(['short_description' => 'Picture ledge, white stained pine effect', 'long_description' =>'Create a homely feel by displaying paintings and favourite items. This display shelf makes it easy to show off what you like - and with several shelves, your home enjoys an entire wall of art and memories.', 'price' => 14.99, 'brand' => 'IKEA', 'material' => 'wood', 'size' => '115 cm', 'other' => '', 'id_category' => 3, 'id_subcategory' => 9]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 3, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 17, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/mosslanda-picture-ledge-white-stained-pine-effect__0990548_pe819042_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/mosslanda-picture-ledge-white-stained-pine-effect__0990549_pe819048_s5.jpg?f=s', 'id_variation' => $variation->id]);

        // // Lighting
        $prod = Product::factory()->create(['short_description' => 'Light bulb sold separately. IKEA recommends LED bulb E12 globe opal white.', 'long_description' =>'This small table lamp with clean lines in white glass spreads a warm light that makes evenings a little extra cozy. A perfect choice for those who want a lamp that goes everywhere and with most styles.', 'price' => 9.99, 'brand' => 'IKEA', 'material' => 'Glass, Polyurethane paint', 'size' => '16 cm', 'other' => '', 'id_category' => 4, 'id_subcategory' => 10]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 1, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 18, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/mosslanda-picture-ledge-white-stained-pine-effect__0990548_pe819042_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/isbrytare-table-lamp-frosted-glass-white__0982335_pe816206_s5.jpg?f=s', 'id_variation' => $variation->id]);

        $prod = Product::factory()->create(['short_description' => 'Remote control kit, color and white spectrum', 'long_description' =>'Movie night, hanging out with friends or making the children’s room even more fun to be in? With this pre-paired kit you can choose from many different colours to help create the right mood. You can even dim the light.', 'price' => 29.99, 'brand' => 'IKEA', 'material' => '', 'size' => ' cm', 'other' => '', 'id_category' => 4, 'id_subcategory' => 11]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 1, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 18, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/tradfri-remote-control-kit-color-and-white-spectrum__0956736_pe804777_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/tradfri-remote-control-kit-color-and-white-spectrum__0775977_pe757658_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/tradfri-remote-control-kit-color-and-white-spectrum__0960442_pe806710_s5.jpg?f=s', 'id_variation' => $variation->id]);

        $prod = Product::factory()->create(['short_description' => 'LED bulb E26 250 lumen, wireless dimmable warm white/globe clear', 'long_description' =>'Smart LED light bulb that can be dimmed wirelessly to create the right mood at home. Resembles old light bulbs with filaments which spread a decorative light and can be used with or without a lampshade.', 'price' => 12.99, 'brand' => 'IKEA', 'material' => '', 'size' => '7 cm', 'other' => '', 'id_category' => 4, 'id_subcategory' => 12]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 1, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 18, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/tradfri-led-bulb-e26-250-lumen-wireless-dimmable-warm-white-globe-clear__0956731_pe804775_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/tradfri-led-bulb-e26-250-lumen-wireless-dimmable-warm-white-globe-clear__0842258_pe781834_s5.jpg?f=s', 'id_variation' => $variation->id]);
        
        // Outdoor
        $prod = Product::factory()->create(['short_description' => 'Bistro set, outdoor, black/light brown stained', 'long_description' =>'Foldable, durable and lovable with its mix of natural acacia hardwood and powder-coated steel. A perfect size for the balcony or in a cozy corner of the deck.', 'price' => 79.99, 'brand' => 'IKEA', 'material' => 'Solid acacia wood, Acrylic stain', 'size' => '32x36 cm', 'other' => '', 'id_category' => 5, 'id_subcategory' => 13]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 15, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 19, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/taernoe-bistro-set-outdoor-black-light-brown-stained__0736028_pe740355_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/taernoe-bistro-set-outdoor-black-light-brown-stained__0667583_pe713986_s5.jpg?f=xl', 'id_variation' => $variation->id]);
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 10, 'id_product' => $prod->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/taernoe-bistro-set-outdoor-black-light-brown-stained-kuddarna-beige__0666808_pe713691_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/taernoe…ined-kuddarna-beige__0667583_pe713986_s5.jpg?f=xl', 'id_variation' => $variation->id]);
        
        $prod = Product::factory()->create(['short_description' => 'Cool basket, bamboo', 'long_description' =>'Isn’t it cozy to eat outdoors? Inside this cool basket in braided bamboo is a cotton bag with a zipper - durable natural materials that together keep food and beverages fresh during the excursion.', 'price' => 49.99, 'brand' => 'IKEA', 'material' => 'Bamboo', 'size' => '10 cm', 'other' => '', 'id_category' => 5, 'id_subcategory' => 14]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 15, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 19, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/kaseberga-cool-basket-bamboo__1057787_pe849363_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/kaseberga-cool-basket-bamboo__1057786_pe849364_s5.jpg?f=s', 'id_variation' => $variation->id]);
        
        
        $prod = Product::factory()->create(['short_description' => 'Storage box, outdoor, light gray/gray,', 'long_description' =>'This waterproof storage box protects your outdoor pads and cushions from rain, sun, dirt, dust and pollen and helps you keep them organized when they’re not being used.', 'price' => 449.99, 'brand' => 'IKEA', 'material' => 'Plastic', 'size' => '156x71x93 cm', 'other' => '', 'id_category' => 5, 'id_subcategory' => 15]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 1, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 19, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/vrenen-storage-box-outdoor-light-gray-gray__0778320_pe758889_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/vrenen-storage-box-outdoor-light-gray-gray__0782765_pe761497_s5.jpg?f=xl', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/vrenen-storage-box-outdoor-light-gray-gray__0781809_pe760959_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/vrenen-storage-box-outdoor-light-gray-gray__0782766_pe761499_s5.jpg?f=s', 'id_variation' => $variation->id]);
        
        // Pots & plants 
        $prod = Product::factory()->create(['short_description' => "Potted plant, Mother-in-law's tongue", 'long_description' =>'Decorate your home with plants combined with a plant pot to suit your style.', 'price' => 9.99, 'brand' => 'IKEA', 'material' => '', 'size' => '1 cm', 'other' => '', 'id_category' => 6, 'id_subcategory' => 16]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 1, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 20, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/sansevieria-trifasciata-potted-plant-mother-in-laws-tongue__0237399_pe376787_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/sansevieria-trifasciata-potted-plant-mother-in-laws-tongue__0908898_pe676659_s5.jpg?f=s', 'id_variation' => $variation->id]);

        $prod = Product::factory()->create(['short_description' => 'Plant pot, indoor/outdoor black', 'long_description' =>'Soft and inviting shapes make FÖRENLIG plant pots easy to like and use in many homes, both indoors and outdoors.', 'price' => 1.99, 'brand' => 'IKEA', 'material' => 'plastic', 'size' => '9 cm', 'other' => '', 'id_category' => 6, 'id_subcategory' => 17]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 2, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 20, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/foerenlig-plant-pot-indoor-outdoor-black__1093819_pe863207_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/foerenlig-plant-pot-indoor-outdoor-black__1093817_pe863232_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/foerenlig-plant-pot-indoor-outdoor-black__1093818_pe863206_s5.jpg?f=xl', 'id_variation' => $variation->id]);

        $prod = Product::factory()->create(['short_description' => 'Watering can, light gray/gold-colour,', 'long_description' =>'The idea with this watering can is that it looks so good that you happily leave it out on display when not using it. Then it’s always close at hand - and makes it easy to remember to water your plants!', 'price' => 14.99, 'brand' => 'IKEA', 'material' => 'Galvanized steel, Powder coating', 'size' => '0,9 l', 'other' => '', 'id_category' => 6, 'id_subcategory' => 18]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 14, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 20, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/vattenkrasse-watering-can-light-gray-gold-colour__1093844_pe863205_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/vattenkrasse-watering-can-light-gray-gold-colour__1093842_pe863230_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/vattenkrasse-watering-can-light-gray-gold-colour__1093843_pe863231_s5.jpg?f=s', 'id_variation' => $variation->id]);
        
        // Kitchen & appliances
        $prod = Product::factory()->create(['short_description' => 'Kitchen utensils, white', 'long_description' =>'The kitchen utensils are a great way to add a touch of style to your kitchen. They are made of stainless steel and are easy to clean and use.', 'price' => 9.99, 'brand' => 'IKEA', 'material' => 'stainless steel', 'size' => '', 'other' => '', 'id_category' => 7, 'id_subcategory' => 19]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 1, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 21, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/variera-shelf-insert-white__81979_pe207258_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/variera-shelf-insert-white__0867261_pe600476_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/variera-shelf-insert-white__0867369_pe600474_s5.jpg?f=s', 'id_variation' => $variation->id]);

        
        $prod = Product::factory()->create(['short_description' => 'Shelf unit, galvanized,', 'long_description' =>'Storage offers lots of room in a kitchen, bathroom and hallway. Things like food or towels lie visible and secure on the metal shelves. Easy to assemble and complete with storage from the same series.', 'price' => 49.99, 'brand' => 'IKEA', 'material' => 'stainless steel', 'size' => '92x36x94 cm', 'other' => '', 'id_category' => 7, 'id_subcategory' => 20]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 1, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 21, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/omar-shelf-unit-galvanized__0650980_pe706616_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/omar-shelf-unit-galvanized__0911610_pe616784_s5.jpg?f=xl', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/omar-shelf-unit-galvanized__0911615_pe618135_s5.jpg?f=xl', 'id_variation' => $variation->id]);
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 4, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 21, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/omar-shelf-unit-gray-green__0924622_pe788596_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/omar-shelf-unit-gray-green__0939893_pe794711_s5.jpg?f=xl', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/omar-shelf-unit-gray-green__0939897_pe794712_s5.jpg?f=s', 'id_variation' => $variation->id]);

        $prod = Product::factory()->create(['short_description' => 'Wall rack, stainless steel', 'long_description' =>'Inspired by professionals, but adapted for you. Just like in a restaurant kitchen, we’ve focused on durable materials and smart wall storage that provides the space needed for all creative home cooks.', 'price' => 30.99, 'brand' => 'IKEA', 'material' => 'stainless steel', 'size' => '12 cm', 'other' => '', 'id_category' => 7, 'id_subcategory' => 21]);
        $name = $prod->name . ' ' .  $faker->firstName();
        $variation = Variation::factory()->create(['name' => $name, 'id_color' => 1, 'id_product' => $prod->id]);
        VariationTag::create(['id_tag' => $variation->id_color, 'id_variation' => $variation->id]);
        VariationTag::create(['id_tag' => 21, 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/kungsfors-wall-rack-stainless-steel__0713281_pe729389_s5.jpg?f=s', 'id_variation' => $variation->id]);
        Img::factory()->create(['url' => 'https://www.ikea.com/ca/en/images/products/kungsfors-wall-rack-stainless-steel__0677968_ph151830_s5.jpg?f=xl', 'id_variation' => $variation->id]);
        
    }
}
