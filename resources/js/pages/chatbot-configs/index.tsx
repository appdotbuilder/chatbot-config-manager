import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';

interface ToolConfig {
    is_enabled: boolean;
}

interface IntegrationSetting {
    is_enabled: boolean;
}

interface ChatbotConfig {
    id: number;
    name: string;
    description?: string;
    status: string;
    created_at: string;
    knowledge_base_documents: unknown[];
    tool_configs: ToolConfig[];
    integration_settings: IntegrationSetting[];
}

interface Props {
    configs: ChatbotConfig[];
    [key: string]: unknown;
}

export default function ChatbotConfigsIndex({ configs }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'text-green-600 bg-green-50 border-green-200';
            case 'inactive':
                return 'text-red-600 bg-red-50 border-red-200';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
            router.delete(`/chatbot-configs/${id}`);
        }
    };

    return (
        <AppShell>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <Heading title="🤖 Chatbot Configurations" />
                        <p className="text-gray-600 mt-2">
                            Manage and configure your AI assistants
                        </p>
                    </div>
                    <Link href="/chatbot-configs/create">
                        <Button>➕ Create New Chatbot</Button>
                    </Link>
                </div>

                {configs.length > 0 ? (
                    <div className="grid gap-6">
                        {configs.map((config) => (
                            <div key={config.id} className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="text-xl font-semibold text-gray-900">
                                                {config.name}
                                            </h3>
                                            <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(config.status)}`}>
                                                {config.status}
                                            </span>
                                        </div>
                                        
                                        <p className="text-gray-600 mb-4">
                                            {config.description || 'No description provided'}
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                <span className="text-lg">📚</span>
                                                <span>{config.knowledge_base_documents.length} documents</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                <span className="text-lg">🛠️</span>
                                                <span>{config.tool_configs.filter(tc => tc.is_enabled).length} tools enabled</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                <span className="text-lg">🔗</span>
                                                <span>{config.integration_settings.filter(is => is.is_enabled).length} integrations</span>
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-500">
                                            Created on {formatDate(config.created_at)}
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-2 ml-6">
                                        <Link href={`/chatbot-configs/${config.id}`}>
                                            <Button variant="outline">
                                                ⚙️ Configure
                                            </Button>
                                        </Link>
                                        <Link href={`/chatbot-configs/${config.id}/edit`}>
                                            <Button variant="outline">
                                                ✏️ Edit
                                            </Button>
                                        </Link>
                                        <Button 
                                            variant="outline"
                                            onClick={() => handleDelete(config.id, config.name)}
                                            className="text-red-600 hover:text-red-700 hover:border-red-300"
                                        >
                                            🗑️
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-xl shadow-md border border-gray-200">
                        <div className="text-6xl mb-6">🤖</div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                            No Chatbots Created Yet
                        </h3>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            Get started by creating your first AI assistant. Configure its personality, 
                            knowledge base, and integrations to make it uniquely yours.
                        </p>
                        <Link href="/chatbot-configs/create">
                            <Button size="lg">
                                🚀 Create Your First Chatbot
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </AppShell>
    );
}