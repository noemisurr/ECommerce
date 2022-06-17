<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Img>
 */
class ImgFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'url' => '',
            'id_variation' => 1
        ];
    }
    // https://angular.pixelstrap.com/multikart/assets/images/product/furniture/3.jpg
    // https://angular.pixelstrap.com/multikart/assets/images/product/furniture/4.jpg
    // https://angular.pixelstrap.com/multikart/assets/images/product/furniture/2.jpg
    // https://angular.pixelstrap.com/multikart/assets/images/product/furniture/7.jpg
    // https://angular.pixelstrap.com/multikart/assets/images/product/furniture/19.jpg
}
