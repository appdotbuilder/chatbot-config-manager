<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreChatbotConfigRequest;
use App\Http\Requests\UpdateChatbotConfigRequest;
use App\Models\ChatbotConfig;
use App\Models\ChatbotTool;
use App\Models\IntegrationSetting;
use Inertia\Inertia;

class ChatbotConfigController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $configs = ChatbotConfig::with(['knowledgeBaseDocuments', 'toolConfigs.chatbotTool', 'integrationSettings'])
            ->latest()
            ->get();
        
        return Inertia::render('chatbot-configs/index', [
            'configs' => $configs
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('chatbot-configs/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreChatbotConfigRequest $request)
    {
        $config = ChatbotConfig::create($request->validated());

        // Create default integration settings
        $defaultIntegrations = [
            ['service_name' => 'google_calendar', 'display_name' => 'Google Calendar'],
            ['service_name' => 'google_sheets', 'display_name' => 'Google Sheets'],
            ['service_name' => 'whatsapp', 'display_name' => 'WhatsApp Business'],
            ['service_name' => 'email', 'display_name' => 'Email (SMTP)'],
        ];

        foreach ($defaultIntegrations as $integration) {
            IntegrationSetting::create([
                'chatbot_config_id' => $config->id,
                'service_name' => $integration['service_name'],
                'display_name' => $integration['display_name'],
                'is_enabled' => false,
                'status' => 'disconnected',
            ]);
        }

        return redirect()->route('chatbot-configs.show', $config)
            ->with('success', 'Chatbot configuration created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ChatbotConfig $chatbotConfig)
    {
        $chatbotConfig->load([
            'knowledgeBaseDocuments',
            'toolConfigs.chatbotTool',
            'integrationSettings'
        ]);

        $availableTools = ChatbotTool::available()->get();

        return Inertia::render('chatbot-configs/show', [
            'config' => $chatbotConfig,
            'availableTools' => $availableTools
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ChatbotConfig $chatbotConfig)
    {
        return Inertia::render('chatbot-configs/edit', [
            'config' => $chatbotConfig
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateChatbotConfigRequest $request, ChatbotConfig $chatbotConfig)
    {
        $chatbotConfig->update($request->validated());

        return redirect()->route('chatbot-configs.show', $chatbotConfig)
            ->with('success', 'Chatbot configuration updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ChatbotConfig $chatbotConfig)
    {
        $chatbotConfig->delete();

        return redirect()->route('chatbot-configs.index')
            ->with('success', 'Chatbot configuration deleted successfully.');
    }
}