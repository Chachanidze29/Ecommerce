<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Category>
 */
class CategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition(): array
    {
        return [
            'enabled' => true,
            'name' => $this->faker->unique()->word(),
            'description' => $this->faker->text(),
            'parent_id' => null,
        ];
    }
}
