<?php

namespace Database\Factories;

use App\Models\ChatbotConfig;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ChatbotConfig>
 */
class ChatbotConfigFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\ChatbotConfig>
     */
    protected $model = ChatbotConfig::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(2, true) . ' Assistant',
            'description' => fake()->sentence(),
            'avatar_url' => fake()->imageUrl(200, 200, 'people'),
            'greeting_message' => 'Hello! How can I help you today?',
            'fallback_message' => "I'm sorry, I don't understand. Could you please rephrase your question?",
            'personality_traits' => ['helpful', 'friendly', 'professional'],
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Indicate that the chatbot is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }
}