<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreKnowledgeBaseDocumentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'document' => 'required|file|mimes:pdf,doc,docx,txt,md|max:10240', // 10MB max
            'chatbot_config_id' => 'required|exists:chatbot_configs,id',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Document title is required.',
            'title.max' => 'Document title cannot exceed 255 characters.',
            'document.required' => 'Please select a document to upload.',
            'document.file' => 'The uploaded item must be a file.',
            'document.mimes' => 'Document must be a PDF, Word document, text file, or Markdown file.',
            'document.max' => 'Document size cannot exceed 10MB.',
            'chatbot_config_id.required' => 'Chatbot configuration is required.',
            'chatbot_config_id.exists' => 'Selected chatbot configuration does not exist.',
        ];
    }
}