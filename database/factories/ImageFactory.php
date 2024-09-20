<?php

namespace Database\Factories;

use App\Models\Image;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Image>
 */
class ImageFactory extends Factory
{
    protected $model = Image::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = ['Gallery', 'Thumbnail', 'Hover'][array_rand(['Gallery', 'Thumbnail', 'Hover'])];

        return [
            'path' => $this->faker->imageUrl(),
            'type' => $type,
            'alt_text' => $this->faker->word(),
        ];
    }
}
