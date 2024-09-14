<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $parentCategories = Category::factory(5)->create();

        $parentCategories->each(function (Category $parentCategory) {
            Category::factory(rand(1, 5))->create([
                'parent_id' => $parentCategory->id,
            ]);
        });

        $categories = Category::all();
        Product::factory(50)->create()->each(function (Product $product) use ($categories) {
            $product->categories()->attach(
                $categories->random(rand(1, 5))->pluck('id')->toArray()
            );
        });
    }
}
