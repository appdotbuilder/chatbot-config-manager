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
        Schema::create('chatbot_tools', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Tool name');
            $table->string('display_name')->comment('Human-readable display name');
            $table->text('description')->comment('Description of what the tool does');
            $table->string('icon')->nullable()->comment('Icon identifier');
            $table->string('category')->comment('Tool category (e.g., productivity, communication)');
            $table->json('required_config')->nullable()->comment('Required configuration fields');
            $table->json('optional_config')->nullable()->comment('Optional configuration fields');
            $table->boolean('is_available')->default(true)->comment('Whether tool is available for use');
            $table->timestamps();
            
            $table->unique('name');
            $table->index('category');
            $table->index('is_available');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chatbot_tools');
    }
};