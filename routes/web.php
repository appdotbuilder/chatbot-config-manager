<?php

use App\Http\Controllers\ChatbotConfigController;
use App\Http\Controllers\ChatbotToolController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\IntegrationController;
use App\Http\Controllers\KnowledgeBaseController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Chatbot Configuration routes
    Route::resource('chatbot-configs', ChatbotConfigController::class);
    
    // Knowledge Base routes
    Route::controller(KnowledgeBaseController::class)->group(function () {
        Route::get('/knowledge-base/{chatbotConfig}', 'index')->name('knowledge-base.index');
        Route::post('/knowledge-base', 'store')->name('knowledge-base.store');
        Route::delete('/knowledge-base/{document}', 'destroy')->name('knowledge-base.destroy');
    });
    
    // Chatbot Tools routes
    Route::controller(ChatbotToolController::class)->group(function () {
        Route::get('/chatbot-tools/{chatbotConfig}', 'index')->name('chatbot-tools.index');
        Route::post('/chatbot-tools', 'store')->name('chatbot-tools.store');
    });
    
    // Integration routes
    Route::controller(IntegrationController::class)->group(function () {
        Route::get('/integrations/{chatbotConfig}', 'index')->name('integrations.index');
        Route::post('/integrations', 'store')->name('integrations.store');
        Route::patch('/integrations/{integration}', 'update')->name('integrations.update');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
