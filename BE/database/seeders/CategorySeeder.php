<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\SubCategory;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::create(['name' => 'Storage and home organization', 'title' => 'Your small stuff perfectly oraganized', 'description' => 'When you know you need those small objects and papers, but you don’t need the clutter, try organizing them into small storage boxes that fit neatly into storage furniture. A mix of materials and textures lets you create your own endlessly refreshable look.']);
        Category::create(['name' => 'Textiles', 'title' => 'Soft and gentle on your skin', 'description' => 'More than just soft and absorbent, our towels and bath robes are made in a responsible way from quality materials so you can trust them on your skin.']);
        Category::create(['name' => 'Home decor', 'title' => 'Display your favourite things', 'description' => 'Decoration adds to our well-being and sense of beauty. Collect some of your favourite small objects that share the same colour scheme and create a poetic summer display at home.']);
        Category::create(['name' => 'Lighting', 'title' => 'Lighting the way to better study habits', 'description' => 'Different lamps can help you focus on your tasks more efficiently, productively and comfortably. Our work and table lamps comes in a range of styles to suit your home office environment. Choose a lamp with a flexible arm and head to direct light exactly where you need it.']);
        Category::create(['name' => 'Outdoor', 'title' => 'Your favourite way to unwind', 'description' => 'It’s finally summer. Time to soak up the sun and take it easy. Whatever your favourite way to relax is - enjoying time with family, or perhaps having a cozy chat with a friend - you can find plenty of comfortable outdoor furniture to make those moments even more special.']);
        Category::create(['name' => 'Pots & plants', 'title' => 'A handy spot for green fingers', 'description' => 'Do you have a passion for gardening, and a corner to spare? Why not turn that surface, indoors or out, into a year-round plant nursery? One with accessories for replanting, pruning and care, standing by for whenever inspiration sprouts.']);
        Category::create(['name' => 'Kitchen & appliances', 'title' => 'Find the perfect kitchen for you', 'description' => 'Whether you’re looking for a complete kitchen system that you can personalize any way you want, or a simpler, yet fully functional kitchen, that you can install in a day, we have a solution to suit your needs, style preference and wallet size. We also want you to feel confident with your IKEA purchases and to do that, we offer a warranty program on our kitchens and appliances.']);
        Category::create(['name' => 'Bathroom', 'title' => 'Spacious bathroom storage with a beautiful finish', 'description' => 'Are you looking for a hard-working bathroom that’s full of well-thought-through details? Our GODMORGON bathroom furniture series is made from sturdy and high-quality materials that are built to last and come with a 10-year warranty. Enjoy soft closing features and full size, extendable drawers with adjustable insides that let you organize your things on your terms.']);
        Category::create(['name' => 'Home electronics', 'title' => 'Stay connected when you’re apart', 'description' => 'You’re never far away from family and friends. With everything you need always at hand and safely charged, you’re as close to them as you are to your home.']);
        Category::create(['name' => 'Pets', 'title' => 'Matching human design with pet needs', 'description' => 'Let’s be honest, pet furniture is often a bit of an eyesore. Well, no more. The Scandinavian design-inspired LURVIG collection is created to blend perfectly into your existing interior while taking your pet’s natural behaviour and needs into account.']);
    }
}
