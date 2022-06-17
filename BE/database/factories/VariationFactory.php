<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Variation>
 */
class VariationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' =>  $this->faker->firstName(),
            'id_color' => $this->faker->numberBetween(1, 11),
            'id_product' => 1,
            'id_discount' => $this->faker->numberBetween(1, 4),
        ];
    }
}
