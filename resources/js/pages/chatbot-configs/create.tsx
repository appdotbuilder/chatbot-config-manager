import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';

export default function CreateChatbotConfig() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        avatar_url: '',
        greeting_message: 'Hello! How can I help you today?',
        fallback_message: "I'm sorry, I don't understand. Could you please rephrase your question?",
        personality_traits: ['helpful', 'friendly'],
        status: 'active'
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        router.post('/chatbot-configs', formData, {
            onError: (errors) => {
                setErrors(errors);
                setIsSubmitting(false);
            },
            onSuccess: () => {
                setIsSubmitting(false);
            }
        });
    };

    const handleTraitChange = (trait: string, checked: boolean) => {
        if (checked) {
            setFormData(prev => ({
                ...prev,
                personality_traits: [...prev.personality_traits, trait]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                personality_traits: prev.personality_traits.filter(t => t !== trait)
            }));
        }
    };

    const commonTraits = [
        'helpful', 'friendly', 'professional', 'casual', 'formal', 
        'empathetic', 'analytical', 'creative', 'efficient', 'patient'
    ];

    return (
        <AppShell>
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <Heading title="🤖 Create New Chatbot" />
                    <p className="text-gray-600 mt-2">
                        Configure your AI assistant's personality and behavior
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md border border-gray-200 p-8 space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                            📋 Basic Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Chatbot Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., Customer Support Assistant"
                                />
                                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Brief description of what this chatbot does..."
                            />
                            {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Avatar URL
                            </label>
                            <input
                                type="url"
                                value={formData.avatar_url}
                                onChange={(e) => setFormData(prev => ({ ...prev, avatar_url: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="https://example.com/avatar.png"
                            />
                            {errors.avatar_url && <p className="text-red-600 text-sm mt-1">{errors.avatar_url}</p>}
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                            💬 Messages
                        </h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Greeting Message
                            </label>
                            <textarea
                                value={formData.greeting_message}
                                onChange={(e) => setFormData(prev => ({ ...prev, greeting_message: e.target.value }))}
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="First message users see when they start chatting"
                            />
                            {errors.greeting_message && <p className="text-red-600 text-sm mt-1">{errors.greeting_message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Fallback Message
                            </label>
                            <textarea
                                value={formData.fallback_message}
                                onChange={(e) => setFormData(prev => ({ ...prev, fallback_message: e.target.value }))}
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Message shown when the chatbot doesn't understand"
                            />
                            {errors.fallback_message && <p className="text-red-600 text-sm mt-1">{errors.fallback_message}</p>}
                        </div>
                    </div>

                    {/* Personality Traits */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                            🎭 Personality Traits
                        </h3>
                        <p className="text-sm text-gray-600">
                            Select traits that define your chatbot's personality and communication style.
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            {commonTraits.map((trait) => (
                                <label key={trait} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.personality_traits.includes(trait)}
                                        onChange={(e) => handleTraitChange(trait, e.target.checked)}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700 capitalize">{trait}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                        <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => router.get('/chatbot-configs')}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? '⏳ Creating...' : '🚀 Create Chatbot'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppShell>
    );
}