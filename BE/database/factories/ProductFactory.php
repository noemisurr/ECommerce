<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition($short_description = '', $long_description = '', $price = '', $brand = '', $id_category = '', $id_subcategory = '', $material = '', $size = '', $other = '')
    {
        return [
            'name' => $this->faker->firstName(),
            'short_description' => $short_description,
            'long_description' => $long_description,
            'price' => $price,
            'brand' => $brand,
            'material' => $material,
            'size' => $size,
            'other' => $other,
            'deleted' => false,
            'id_category' => $id_category,
            'id_subcategory' => $id_subcategory
        ];
    }
}
