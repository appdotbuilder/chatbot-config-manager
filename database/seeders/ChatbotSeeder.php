<?php

namespace Database\Seeders;

use App\Models\ChatbotConfig;
use App\Models\ChatbotTool;
use App\Models\IntegrationSetting;
use Illuminate\Database\Seeder;

class ChatbotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create default chatbot tools
        $tools = [
            [
                'name' => 'google_calendar',
                'display_name' => 'Google Calendar',
                'description' => 'Access and manage Google Calendar events. Schedule meetings, check availability, and create calendar entries.',
                'icon' => 'calendar',
                'category' => 'productivity',
                'required_config' => ['client_id', 'client_secret'],
                'optional_config' => ['default_calendar_id', 'timezone'],
                'is_available' => true,
            ],
            [
                'name' => 'google_sheets',
                'display_name' => 'Google Sheets',
                'description' => 'Read and write data to Google Sheets. Perfect for data analysis and reporting.',
                'icon' => 'table',
                'category' => 'productivity',
                'required_config' => ['service_account_key'],
                'optional_config' => ['default_spreadsheet_id'],
                'is_available' => true,
            ],
            [
                'name' => 'whatsapp',
                'display_name' => 'WhatsApp Business',
                'description' => 'Send and receive WhatsApp messages through the Business API.',
                'icon' => 'message-circle',
                'category' => 'communication',
                'required_config' => ['phone_number_id', 'access_token'],
                'optional_config' => ['webhook_verify_token'],
                'is_available' => true,
            ],
            [
                'name' => 'email_sender',
                'display_name' => 'Email Sender',
                'description' => 'Send emails via SMTP. Great for notifications and automated responses.',
                'icon' => 'mail',
                'category' => 'communication',
                'required_config' => ['smtp_host', 'smtp_port', 'username', 'password'],
                'optional_config' => ['from_name', 'encryption'],
                'is_available' => true,
            ],
            [
                'name' => 'slack',
                'display_name' => 'Slack',
                'description' => 'Post messages and interact with Slack channels and users.',
                'icon' => 'slack',
                'category' => 'communication',
                'required_config' => ['bot_token'],
                'optional_config' => ['default_channel'],
                'is_available' => true,
            ],
            [
                'name' => 'notion',
                'display_name' => 'Notion',
                'description' => 'Create and update Notion pages and databases.',
                'icon' => 'file-text',
                'category' => 'productivity',
                'required_config' => ['integration_token'],
                'optional_config' => ['default_database_id'],
                'is_available' => true,
            ],
        ];

        foreach ($tools as $toolData) {
            ChatbotTool::firstOrCreate(
                ['name' => $toolData['name']],
                $toolData
            );
        }

        // Create a sample chatbot configuration
        $chatbot = ChatbotConfig::firstOrCreate(
            ['name' => 'AI Assistant'],
            [
                'description' => 'A helpful AI assistant with access to various tools and integrations.',
                'greeting_message' => 'Hello! I\'m your AI assistant. I can help you with calendar management, data analysis, sending messages, and much more. How can I assist you today?',
                'fallback_message' => 'I\'m sorry, I don\'t understand that request. Could you please rephrase it or ask me something else?',
                'personality_traits' => ['helpful', 'professional', 'efficient', 'friendly'],
                'status' => 'active',
            ]
        );

        // Create integration settings for the sample chatbot
        $integrations = [
            [
                'service_name' => 'google_calendar',
                'display_name' => 'Google Calendar',
                'is_enabled' => false,
                'status' => 'disconnected',
            ],
            [
                'service_name' => 'google_sheets',
                'display_name' => 'Google Sheets',
                'is_enabled' => false,
                'status' => 'disconnected',
            ],
            [
                'service_name' => 'whatsapp',
                'display_name' => 'WhatsApp Business',
                'is_enabled' => false,
                'status' => 'disconnected',
            ],
            [
                'service_name' => 'email',
                'display_name' => 'Email (SMTP)',
                'is_enabled' => false,
                'status' => 'disconnected',
            ],
        ];

        foreach ($integrations as $integrationData) {
            IntegrationSetting::firstOrCreate(
                [
                    'chatbot_config_id' => $chatbot->id,
                    'service_name' => $integrationData['service_name'],
                ],
                $integrationData
            );
        }
    }
}