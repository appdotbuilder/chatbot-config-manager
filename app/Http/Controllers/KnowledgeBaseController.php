<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreKnowledgeBaseDocumentRequest;
use App\Models\ChatbotConfig;
use App\Models\KnowledgeBaseDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class KnowledgeBaseController extends Controller
{
    /**
     * Display the knowledge base for a chatbot.
     */
    public function index(ChatbotConfig $chatbotConfig)
    {
        $documents = $chatbotConfig->knowledgeBaseDocuments()
            ->latest()
            ->get();

        return Inertia::render('knowledge-base/index', [
            'config' => $chatbotConfig,
            'documents' => $documents
        ]);
    }

    /**
     * Store a newly uploaded document.
     */
    public function store(StoreKnowledgeBaseDocumentRequest $request)
    {
        $file = $request->file('document');
        $chatbotConfig = ChatbotConfig::findOrFail($request->chatbot_config_id);
        
        // Store the file
        $filePath = $file->store('knowledge-base/' . $chatbotConfig->id, 'private');
        
        // Extract content based on file type (simplified for now)
        $content = null;
        if ($file->getClientMimeType() === 'text/plain') {
            $content = file_get_contents($file->getPathname());
        }

        $document = KnowledgeBaseDocument::create([
            'chatbot_config_id' => $request->chatbot_config_id,
            'title' => $request->title,
            'filename' => $file->getClientOriginalName(),
            'file_path' => $filePath,
            'file_type' => $file->getClientMimeType(),
            'file_size' => $file->getSize(),
            'content' => $content,
            'status' => $content ? 'ready' : 'processing',
        ]);

        return Inertia::render('knowledge-base/index', [
            'config' => $chatbotConfig,
            'documents' => $chatbotConfig->knowledgeBaseDocuments()->latest()->get()
        ]);
    }

    /**
     * Remove a document from the knowledge base.
     */
    public function destroy(KnowledgeBaseDocument $document)
    {
        // Delete the file from storage
        Storage::disk('private')->delete($document->file_path);
        
        $chatbotConfig = $document->chatbotConfig;
        $document->delete();

        return Inertia::render('knowledge-base/index', [
            'config' => $chatbotConfig,
            'documents' => $chatbotConfig->knowledgeBaseDocuments()->latest()->get()
        ]);
    }
}