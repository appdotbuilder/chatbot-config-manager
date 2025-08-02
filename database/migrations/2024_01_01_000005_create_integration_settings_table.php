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
        Schema::create('integration_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chatbot_config_id')->constrained()->onDelete('cascade');
            $table->string('service_name')->comment('Name of the service (e.g., google_calendar, whatsapp)');
            $table->string('display_name')->comment('Human-readable service name');
            $table->boolean('is_enabled')->default(false)->comment('Whether integration is enabled');
            $table->json('credentials')->nullable()->comment('Encrypted API keys and tokens');
            $table->json('settings')->nullable()->comment('Service-specific settings');
            $table->timestamp('last_sync_at')->nullable()->comment('Last successful sync timestamp');
            $table->enum('status', ['connected', 'disconnected', 'error'])->default('disconnected')->comment('Connection status');
            $table->text('error_message')->nullable()->comment('Last error message');
            $table->timestamps();
            
            $table->unique(['chatbot_config_id', 'service_name']);
            $table->index(['chatbot_config_id', 'is_enabled']);
            $table->index('service_name');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('integration_settings');
    }
};