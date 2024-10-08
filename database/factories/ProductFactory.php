<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'enabled' => true,
            'sku' => $this->faker->unique()->ean8(),
            'name' => $this->faker->word(),
            'description' => $this->faker->sentence(100),
            'price' => $this->faker->randomFloat(2, 5, 100),
        ];
    }
}
