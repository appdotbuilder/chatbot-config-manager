<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ChatbotConfig;
use App\Models\ChatbotTool;
use App\Models\IntegrationSetting;
use App\Models\KnowledgeBaseDocument;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the main dashboard.
     */
    public function index()
    {
        $stats = [
            'total_chatbots' => ChatbotConfig::count(),
            'active_chatbots' => ChatbotConfig::active()->count(),
            'total_documents' => KnowledgeBaseDocument::count(),
            'ready_documents' => KnowledgeBaseDocument::ready()->count(),
            'available_tools' => ChatbotTool::available()->count(),
            'connected_integrations' => IntegrationSetting::connected()->count(),
        ];

        $recentChatbots = ChatbotConfig::with(['knowledgeBaseDocuments', 'integrationSettings'])
            ->latest()
            ->take(5)
            ->get();

        $recentDocuments = KnowledgeBaseDocument::with('chatbotConfig')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentChatbots' => $recentChatbots,
            'recentDocuments' => $recentDocuments,
        ]);
    }
}