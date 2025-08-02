<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ChatbotConfig;
use App\Models\ChatbotTool;
use App\Models\ChatbotToolConfig;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatbotToolController extends Controller
{
    /**
     * Display the tools configuration for a chatbot.
     */
    public function index(ChatbotConfig $chatbotConfig)
    {
        $tools = ChatbotTool::available()
            ->with(['toolConfigs' => function ($query) use ($chatbotConfig) {
                $query->where('chatbot_config_id', $chatbotConfig->id);
            }])
            ->get();

        return Inertia::render('chatbot-tools/index', [
            'config' => $chatbotConfig,
            'tools' => $tools
        ]);
    }

    /**
     * Toggle a tool's enabled status for a chatbot.
     */
    public function store(Request $request)
    {
        $request->validate([
            'chatbot_config_id' => 'required|exists:chatbot_configs,id',
            'chatbot_tool_id' => 'required|exists:chatbot_tools,id',
            'is_enabled' => 'required|boolean',
            'configuration' => 'nullable|array',
        ]);

        ChatbotToolConfig::updateOrCreate(
            [
                'chatbot_config_id' => $request->chatbot_config_id,
                'chatbot_tool_id' => $request->chatbot_tool_id,
            ],
            [
                'is_enabled' => $request->is_enabled,
                'configuration' => $request->configuration ?? [],
            ]
        );

        $chatbotConfig = ChatbotConfig::findOrFail($request->chatbot_config_id);
        $tools = ChatbotTool::available()
            ->with(['toolConfigs' => function ($query) use ($chatbotConfig) {
                $query->where('chatbot_config_id', $chatbotConfig->id);
            }])
            ->get();

        return Inertia::render('chatbot-tools/index', [
            'config' => $chatbotConfig,
            'tools' => $tools
        ]);
    }
}