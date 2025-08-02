import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';

interface Stats {
    total_chatbots: number;
    active_chatbots: number;
    total_documents: number;
    ready_documents: number;
    available_tools: number;
    connected_integrations: number;
}

interface ChatbotConfig {
    id: number;
    name: string;
    description?: string;
    status: string;
    created_at: string;
    knowledge_base_documents: unknown[];
    integration_settings: unknown[];
}

interface KnowledgeBaseDocument {
    id: number;
    title: string;
    filename: string;
    status: string;
    created_at: string;
    chatbot_config: {
        id: number;
        name: string;
    };
}

interface Props {
    stats: Stats;
    recentChatbots: ChatbotConfig[];
    recentDocuments: KnowledgeBaseDocument[];
    [key: string]: unknown;
}

export default function Dashboard({ stats, recentChatbots, recentDocuments }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
            case 'ready':
            case 'connected':
                return 'text-green-600 bg-green-50';
            case 'inactive':
            case 'processing':
                return 'text-yellow-600 bg-yellow-50';
            case 'error':
                return 'text-red-600 bg-red-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <AppShell>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <Heading title="🤖 Chatbot Management Dashboard" />
                        <p className="text-gray-600 mt-2">
                            Configure, manage, and monitor your AI assistants
                        </p>
                    </div>
                    <Link href="/chatbot-configs/create">
                        <Button size="lg">
                            ➕ Create New Chatbot
                        </Button>
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total Chatbots</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.total_chatbots}</p>
                                <p className="text-green-600 text-sm">
                                    {stats.active_chatbots} active
                                </p>
                            </div>
                            <div className="text-4xl">🤖</div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Knowledge Base</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.total_documents}</p>
                                <p className="text-blue-600 text-sm">
                                    {stats.ready_documents} ready
                                </p>
                            </div>
                            <div className="text-4xl">📚</div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Integrations</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.connected_integrations}</p>
                                <p className="text-purple-600 text-sm">
                                    {stats.available_tools} tools available
                                </p>
                            </div>
                            <div className="text-4xl">🔗</div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">⚡ Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link href="/chatbot-configs/create">
                            <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                                <span className="text-2xl">🤖</span>
                                <span className="text-sm">New Chatbot</span>
                            </Button>
                        </Link>
                        <Link href="/chatbot-configs">
                            <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                                <span className="text-2xl">📊</span>
                                <span className="text-sm">Manage Bots</span>
                            </Button>
                        </Link>
                        <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                            <span className="text-2xl">📈</span>
                            <span className="text-sm">Analytics</span>
                        </Button>
                        <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                            <span className="text-2xl">⚙️</span>
                            <span className="text-sm">Settings</span>
                        </Button>
                    </div>
                </div>

                {/* Recent Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Chatbots */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    📋 Recent Chatbots
                                </h3>
                                <Link href="/chatbot-configs">
                                    <Button variant="outline" size="sm">View All</Button>
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {recentChatbots.length > 0 ? (
                                <div className="space-y-4">
                                    {recentChatbots.map((chatbot) => (
                                        <div key={chatbot.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2">
                                                    <h4 className="font-medium text-gray-900">
                                                        {chatbot.name}
                                                    </h4>
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(chatbot.status)}`}>
                                                        {chatbot.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {chatbot.description || 'No description'}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Created {formatDate(chatbot.created_at)}
                                                </p>
                                            </div>
                                            <Link href={`/chatbot-configs/${chatbot.id}`}>
                                                <Button variant="outline" size="sm">
                                                    Configure
                                                </Button>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-4">🤖</div>
                                    <p className="text-gray-600">No chatbots created yet</p>
                                    <Link href="/chatbot-configs/create">
                                        <Button className="mt-4">Create Your First Chatbot</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Documents */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">
                                📄 Recent Documents
                            </h3>
                        </div>
                        <div className="p-6">
                            {recentDocuments.length > 0 ? (
                                <div className="space-y-4">
                                    {recentDocuments.map((doc) => (
                                        <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2">
                                                    <h4 className="font-medium text-gray-900">
                                                        {doc.title}
                                                    </h4>
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}>
                                                        {doc.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {doc.filename}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    For {doc.chatbot_config.name} • {formatDate(doc.created_at)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-4">📚</div>
                                    <p className="text-gray-600">No documents uploaded yet</p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Upload documents to build your chatbot's knowledge base
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}