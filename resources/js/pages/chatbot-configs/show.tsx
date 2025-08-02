import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';

interface ChatbotConfig {
    id: number;
    name: string;
    description?: string;
    avatar_url?: string;
    greeting_message?: string;
    fallback_message?: string;
    personality_traits?: string[];
    status: string;
    created_at: string;
    knowledge_base_documents: KnowledgeBaseDocument[];
    tool_configs: ToolConfig[];
    integration_settings: IntegrationSetting[];
}

interface KnowledgeBaseDocument {
    id: number;
    title: string;
    filename: string;
    status: string;
    file_size: number;
}

interface ToolConfig {
    id: number;
    is_enabled: boolean;
    chatbot_tool: {
        id: number;
        name: string;
        display_name: string;
        description: string;
        icon?: string;
        category: string;
    };
}

interface IntegrationSetting {
    id: number;
    service_name: string;
    display_name: string;
    is_enabled: boolean;
    status: string;
    last_sync_at?: string;
}

interface Props {
    config: ChatbotConfig;
    [key: string]: unknown;
}

export default function ShowChatbotConfig({ config }: Props) {
    const formatFileSize = (bytes: number) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Bytes';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
            case 'ready':
            case 'connected':
                return 'text-green-600 bg-green-50 border-green-200';
            case 'inactive':
            case 'processing':
            case 'disconnected':
                return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'error':
                return 'text-red-600 bg-red-50 border-red-200';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const enabledTools = config.tool_configs.filter(tc => tc.is_enabled);
    const enabledIntegrations = config.integration_settings.filter(is => is.is_enabled);

    return (
        <AppShell>
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                        {config.avatar_url && (
                            <img 
                                src={config.avatar_url} 
                                alt={config.name}
                                className="w-16 h-16 rounded-full object-cover border border-gray-200"
                            />
                        )}
                        <div>
                            <div className="flex items-center space-x-3 mb-2">
                                <Heading title={config.name} />
                                <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(config.status)}`}>
                                    {config.status}
                                </span>
                            </div>
                            <p className="text-gray-600">
                                {config.description || 'No description provided'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Link href={`/chatbot-configs/${config.id}/edit`}>
                            <Button variant="outline">✏️ Edit</Button>
                        </Link>
                        <Button>🚀 Deploy</Button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Documents</p>
                                <p className="text-2xl font-bold text-gray-900">{config.knowledge_base_documents.length}</p>
                            </div>
                            <div className="text-2xl">📚</div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Tools Enabled</p>
                                <p className="text-2xl font-bold text-gray-900">{enabledTools.length}</p>
                            </div>
                            <div className="text-2xl">🛠️</div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Integrations</p>
                                <p className="text-2xl font-bold text-gray-900">{enabledIntegrations.length}</p>
                            </div>
                            <div className="text-2xl">🔗</div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Personality</p>
                                <p className="text-2xl font-bold text-gray-900">{config.personality_traits?.length || 0}</p>
                            </div>
                            <div className="text-2xl">🎭</div>
                        </div>
                    </div>
                </div>

                {/* Management Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Knowledge Base */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    📚 Knowledge Base
                                </h3>
                                <Link href={`/knowledge-base/${config.id}`}>
                                    <Button variant="outline" size="sm">Manage</Button>
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {config.knowledge_base_documents.length > 0 ? (
                                <div className="space-y-3">
                                    {config.knowledge_base_documents.slice(0, 3).map((doc) => (
                                        <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900">{doc.title}</p>
                                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                    <span>{doc.filename}</span>
                                                    <span>•</span>
                                                    <span>{formatFileSize(doc.file_size)}</span>
                                                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(doc.status)}`}>
                                                        {doc.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {config.knowledge_base_documents.length > 3 && (
                                        <p className="text-sm text-gray-600 text-center py-2">
                                            +{config.knowledge_base_documents.length - 3} more documents
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-3xl mb-2">📄</div>
                                    <p className="text-gray-600">No documents uploaded</p>
                                    <Link href={`/knowledge-base/${config.id}`}>
                                        <Button size="sm" className="mt-2">Upload Documents</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Tools */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    🛠️ Tools & Capabilities
                                </h3>
                                <Link href={`/chatbot-tools/${config.id}`}>
                                    <Button variant="outline" size="sm">Configure</Button>
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {enabledTools.length > 0 ? (
                                <div className="space-y-3">
                                    {enabledTools.slice(0, 3).map((toolConfig) => (
                                        <div key={toolConfig.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="text-xl">{toolConfig.chatbot_tool.icon || '🔧'}</div>
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {toolConfig.chatbot_tool.display_name}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {toolConfig.chatbot_tool.category}
                                                </p>
                                            </div>
                                            <div className="ml-auto">
                                                <span className="px-2 py-1 text-xs bg-green-50 text-green-600 rounded-full">
                                                    Enabled
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    {enabledTools.length > 3 && (
                                        <p className="text-sm text-gray-600 text-center py-2">
                                            +{enabledTools.length - 3} more tools enabled
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-3xl mb-2">🛠️</div>
                                    <p className="text-gray-600">No tools enabled</p>
                                    <Link href={`/chatbot-tools/${config.id}`}>
                                        <Button size="sm" className="mt-2">Enable Tools</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Integrations */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">
                                🔗 External Integrations
                            </h3>
                            <Link href={`/integrations/${config.id}`}>
                                <Button variant="outline" size="sm">Configure</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="p-6">
                        {config.integration_settings.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {config.integration_settings.map((integration) => (
                                    <div key={integration.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {integration.display_name}
                                            </p>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(integration.status)}`}>
                                                    {integration.status}
                                                </span>
                                                {integration.is_enabled && (
                                                    <span className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-full">
                                                        Enabled
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-3xl mb-2">🔗</div>
                                <p className="text-gray-600">No integrations configured</p>
                                <Link href={`/integrations/${config.id}`}>
                                    <Button size="sm" className="mt-2">Setup Integrations</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Configuration Details */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">
                            ⚙️ Configuration Details
                        </h3>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">💬 Greeting Message</h4>
                            <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
                                {config.greeting_message || 'No greeting message set'}
                            </p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">🤷 Fallback Message</h4>
                            <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
                                {config.fallback_message || 'No fallback message set'}
                            </p>
                        </div>
                        {config.personality_traits && config.personality_traits.length > 0 && (
                            <div className="md:col-span-2">
                                <h4 className="font-medium text-gray-900 mb-2">🎭 Personality Traits</h4>
                                <div className="flex flex-wrap gap-2">
                                    {config.personality_traits.map((trait) => (
                                        <span key={trait} className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full">
                                            {trait}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}