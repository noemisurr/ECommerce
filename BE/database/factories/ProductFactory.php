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
    public function definition()
    {
        return [
            'name' => $this->faker->firstName(),
            'short_description' => $this->faker->text(50),
            'long_description' => $this->faker->text(150),
            'price' => $this->faker->numberBetween(10, 500),
            'deleted' => false,
            'id_category' =>  $this->faker->numberBetween(1, 5),
        ];
    }
}
