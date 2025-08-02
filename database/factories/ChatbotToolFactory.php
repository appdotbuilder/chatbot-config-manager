<?php

namespace Database\Factories;

use App\Models\ChatbotTool;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ChatbotTool>
 */
class ChatbotToolFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\ChatbotTool>
     */
    protected $model = ChatbotTool::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tools = [
            [
                'name' => 'google_calendar',
                'display_name' => 'Google Calendar',
                'description' => 'Access and manage Google Calendar events',
                'icon' => 'calendar',
                'category' => 'productivity',
                'required_config' => ['client_id', 'client_secret'],
                'optional_config' => ['default_calendar_id'],
            ],
            [
                'name' => 'google_sheets',
                'display_name' => 'Google Sheets',
                'description' => 'Read and write data to Google Sheets',
                'icon' => 'table',
                'category' => 'productivity',
                'required_config' => ['service_account_key'],
                'optional_config' => ['default_spreadsheet_id'],
            ],
            [
                'name' => 'email_sender',
                'display_name' => 'Email Sender',
                'description' => 'Send emails via SMTP',
                'icon' => 'mail',
                'category' => 'communication',
                'required_config' => ['smtp_host', 'smtp_port', 'username', 'password'],
                'optional_config' => ['from_name'],
            ],
        ];

        $tool = fake()->randomElement($tools);

        return [
            'name' => $tool['name'],
            'display_name' => $tool['display_name'],
            'description' => $tool['description'],
            'icon' => $tool['icon'],
            'category' => $tool['category'],
            'required_config' => $tool['required_config'],
            'optional_config' => $tool['optional_config'],
            'is_available' => fake()->boolean(90),
        ];
    }
}