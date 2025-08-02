<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ChatbotConfig;
use App\Models\IntegrationSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IntegrationController extends Controller
{
    /**
     * Display the integrations for a chatbot.
     */
    public function index(ChatbotConfig $chatbotConfig)
    {
        $integrations = $chatbotConfig->integrationSettings()
            ->latest()
            ->get();

        return Inertia::render('integrations/index', [
            'config' => $chatbotConfig,
            'integrations' => $integrations
        ]);
    }

    /**
     * Update an integration's settings.
     */
    public function store(Request $request)
    {
        $request->validate([
            'chatbot_config_id' => 'required|exists:chatbot_configs,id',
            'service_name' => 'required|string',
            'display_name' => 'required|string',
            'is_enabled' => 'required|boolean',
            'credentials' => 'nullable|array',
            'settings' => 'nullable|array',
        ]);

        $integration = IntegrationSetting::updateOrCreate(
            [
                'chatbot_config_id' => $request->chatbot_config_id,
                'service_name' => $request->service_name,
            ],
            [
                'display_name' => $request->display_name,
                'is_enabled' => $request->is_enabled,
                'credentials' => $request->credentials ?? [],
                'settings' => $request->settings ?? [],
                'status' => $request->is_enabled && !empty($request->credentials) ? 'connected' : 'disconnected',
            ]
        );

        $chatbotConfig = ChatbotConfig::findOrFail($request->chatbot_config_id);
        $integrations = $chatbotConfig->integrationSettings()->latest()->get();

        return Inertia::render('integrations/index', [
            'config' => $chatbotConfig,
            'integrations' => $integrations
        ]);
    }

    /**
     * Test an integration connection.
     */
    public function update(Request $request, IntegrationSetting $integration)
    {
        $request->validate([
            'action' => 'required|in:test,disconnect',
        ]);

        if ($request->action === 'test') {
            // Simulate connection test
            $integration->update([
                'status' => random_int(1, 10) > 2 ? 'connected' : 'error',
                'error_message' => random_int(1, 10) > 2 ? null : 'Connection failed: Invalid credentials',
                'last_sync_at' => random_int(1, 10) > 2 ? now() : null,
            ]);
        } elseif ($request->action === 'disconnect') {
            $integration->update([
                'is_enabled' => false,
                'status' => 'disconnected',
                'error_message' => null,
                'last_sync_at' => null,
            ]);
        }

        $chatbotConfig = $integration->chatbotConfig;
        $integrations = $chatbotConfig->integrationSettings()->latest()->get();

        return Inertia::render('integrations/index', [
            'config' => $chatbotConfig,
            'integrations' => $integrations
        ]);
    }
}