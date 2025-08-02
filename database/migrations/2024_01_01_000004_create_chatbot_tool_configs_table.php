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
        Schema::create('chatbot_tool_configs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chatbot_config_id')->constrained()->onDelete('cascade');
            $table->foreignId('chatbot_tool_id')->constrained()->onDelete('cascade');
            $table->boolean('is_enabled')->default(false)->comment('Whether tool is enabled for this chatbot');
            $table->json('configuration')->nullable()->comment('Tool-specific configuration');
            $table->timestamps();
            
            $table->unique(['chatbot_config_id', 'chatbot_tool_id']);
            $table->index(['chatbot_config_id', 'is_enabled']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chatbot_tool_configs');
    }
};