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
        Schema::create('knowledge_base_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chatbot_config_id')->constrained()->onDelete('cascade');
            $table->string('title')->comment('Document title');
            $table->string('filename')->comment('Original filename');
            $table->string('file_path')->comment('Path to stored file');
            $table->string('file_type')->comment('MIME type of the file');
            $table->integer('file_size')->comment('File size in bytes');
            $table->text('content')->nullable()->comment('Extracted text content');
            $table->json('metadata')->nullable()->comment('Additional metadata');
            $table->enum('status', ['processing', 'ready', 'error'])->default('processing')->comment('Processing status');
            $table->text('error_message')->nullable()->comment('Error message if processing failed');
            $table->timestamps();
            
            $table->index(['chatbot_config_id', 'status']);
            $table->index('status');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('knowledge_base_documents');
    }
};