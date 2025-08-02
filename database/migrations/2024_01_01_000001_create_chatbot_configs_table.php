<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chatbot_configs', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Name of the chatbot');
            $table->string('description')->nullable()->comment('Description of the chatbot');
            $table->string('avatar_url')->nullable()->comment('URL to chatbot avatar image');
            $table->string('greeting_message')->nullable()->comment('Initial greeting message');
            $table->string('fallback_message')->nullable()->comment('Message when chatbot cannot help');
            $table->json('personality_traits')->nullable()->comment('JSON array of personality traits');
            $table->enum('status', ['active', 'inactive'])->default('active')->comment('Chatbot status');
            $table->timestamps();
            
            $table->index('status');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chatbot_configs');
    }
};