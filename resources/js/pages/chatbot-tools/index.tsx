import React from 'react';
import { router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';

interface ChatbotConfig {
    id: number;
    name: string;
}

interface ChatbotTool {
    id: number;
    name: string;
    display_name: string;
    description: string;
    icon?: string;
    category: string;
    required_config: string[];
    optional_config: string[];
    tool_configs: ToolConfig[];
}

interface ToolConfig {
    id: number;
    is_enabled: boolean;
    configuration: Record<string, unknown>;
}

interface Props {
    config: ChatbotConfig;
    tools: ChatbotTool[];
    [key: string]: unknown;
}

export default function ChatbotToolsIndex({ config, tools }: Props) {


    const getToolIcon = (tool: ChatbotTool) => {
        if (tool.icon) return tool.icon;
        switch (tool.category) {
            case 'productivity': return '⚡';
            case 'communication': return '💬';
            default: return '🔧';
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'productivity':
                return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'communication':
                return 'text-green-600 bg-green-50 border-green-200';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const isToolEnabled = (tool: ChatbotTool) => {
        return tool.tool_configs.length > 0 && tool.tool_configs[0].is_enabled;
    };

    const toggleTool = (tool: ChatbotTool) => {
        const isEnabled = isToolEnabled(tool);
        
        router.post('/chatbot-tools', {
            chatbot_config_id: config.id,
            chatbot_tool_id: tool.id,
            is_enabled: !isEnabled,
            configuration: (tool.tool_configs[0]?.configuration as Record<string, string>) || {}
        });
    };

    const groupedTools = tools.reduce((groups, tool) => {
        const category = tool.category;
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(tool);
        return groups;
    }, {} as Record<string, ChatbotTool[]>);

    return (
        <AppShell>
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <Heading title="🛠️ Tools & Capabilities" />
                        <p className="text-gray-600 mt-2">
                            Configure tools and capabilities for <strong>{config.name}</strong>
                        </p>
                    </div>
                    <Button 
                        variant="outline"
                        onClick={() => router.get(`/chatbot-configs/${config.id}`)}
                    >
                        ← Back to Chatbot
                    </Button>
                </div>

                {/* Tools by Category */}
                <div className="space-y-8">
                    {Object.entries(groupedTools).map(([category, categoryTools]) => (
                        <div key={category} className="bg-white rounded-xl shadow-md border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center space-x-2">
                                    <span className="text-2xl">
                                        {category === 'productivity' ? '⚡' : category === 'communication' ? '💬' : '🔧'}
                                    </span>
                                    <h2 className="text-xl font-semibold text-gray-900 capitalize">
                                        {category} Tools
                                    </h2>
                                    <span className="text-sm text-gray-500">
                                        ({categoryTools.filter(isToolEnabled).length}/{categoryTools.length} enabled)
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {categoryTools.map((tool) => {
                                        const enabled = isToolEnabled(tool);
                                        return (
                                            <div key={tool.id} className={`p-6 rounded-xl border-2 transition-all ${
                                                enabled 
                                                    ? 'border-green-200 bg-green-50' 
                                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                            }`}>
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="text-3xl">
                                                            {getToolIcon(tool)}
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg font-semibold text-gray-900">
                                                                {tool.display_name}
                                                            </h3>
                                                            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(tool.category)}`}>
                                                                {tool.category}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        {enabled && (
                                                            <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                                                                ✓ Enabled
                                                            </span>
                                                        )}
                                                        <Button
                                                            variant={enabled ? "outline" : "default"}
                                                            size="sm"
                                                            onClick={() => toggleTool(tool)}
                                                        >
                                                            {enabled ? 'Disable' : 'Enable'}
                                                        </Button>
                                                    </div>
                                                </div>

                                                <p className="text-gray-600 text-sm mb-4">
                                                    {tool.description}
                                                </p>

                                                {/* Configuration Requirements */}
                                                <div className="space-y-3">
                                                    {tool.required_config.length > 0 && (
                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                                                                🔴 Required Configuration:
                                                            </h4>
                                                            <div className="flex flex-wrap gap-2">
                                                                {tool.required_config.map((config) => (
                                                                    <span key={config} className="px-2 py-1 text-xs bg-red-50 text-red-600 rounded-full border border-red-200">
                                                                        {config.replace('_', ' ')}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {tool.optional_config.length > 0 && (
                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                                                                🟡 Optional Configuration:
                                                            </h4>
                                                            <div className="flex flex-wrap gap-2">
                                                                {tool.optional_config.map((config) => (
                                                                    <span key={config} className="px-2 py-1 text-xs bg-yellow-50 text-yellow-600 rounded-full border border-yellow-200">
                                                                        {config.replace('_', ' ')}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {enabled && (
                                                    <div className="mt-4 pt-4 border-t border-green-200">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm text-green-700 font-medium">
                                                                ✅ This tool is active and available to your chatbot
                                                            </span>
                                                            <Button 
                                                                variant="outline" 
                                                                size="sm"
                                                                className="text-blue-600 hover:text-blue-700"
                                                            >
                                                                ⚙️ Configure
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Help Section */}
                <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
                    <div className="flex items-start space-x-3">
                        <div className="text-2xl">💡</div>
                        <div>
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">
                                How Tools Work
                            </h3>
                            <div className="text-blue-800 text-sm space-y-2">
                                <p>
                                    • <strong>Enable tools</strong> to give your chatbot specific capabilities like calendar access or email sending
                                </p>
                                <p>
                                    • <strong>Required configuration</strong> fields must be set up in the Integrations section before tools work
                                </p>
                                <p>
                                    • <strong>Optional configuration</strong> can improve tool functionality but isn't necessary
                                </p>
                                <p>
                                    • Your chatbot will automatically know how to use enabled tools when responding to user requests
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}