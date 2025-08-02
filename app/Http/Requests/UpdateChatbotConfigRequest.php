<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateChatbotConfigRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'avatar_url' => 'nullable|url|max:255',
            'greeting_message' => 'nullable|string|max:500',
            'fallback_message' => 'nullable|string|max:500',
            'personality_traits' => 'nullable|array',
            'personality_traits.*' => 'string|max:50',
            'status' => 'required|in:active,inactive',
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
            'name.required' => 'Chatbot name is required.',
            'name.max' => 'Chatbot name cannot exceed 255 characters.',
            'description.max' => 'Description cannot exceed 1000 characters.',
            'avatar_url.url' => 'Avatar URL must be a valid URL.',
            'greeting_message.max' => 'Greeting message cannot exceed 500 characters.',
            'fallback_message.max' => 'Fallback message cannot exceed 500 characters.',
            'status.required' => 'Status is required.',
            'status.in' => 'Status must be either active or inactive.',
        ];
    }
}