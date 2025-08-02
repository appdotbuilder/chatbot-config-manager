import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';

interface ChatbotConfig {
    id: number;
    name: string;
}

interface IntegrationSetting {
    id: number;
    service_name: string;
    display_name: string;
    is_enabled: boolean;
    status: string;
    error_message?: string;
    last_sync_at?: string;
    credentials?: Record<string, string>;
    settings?: Record<string, string>;
}

interface Props {
    config: ChatbotConfig;
    integrations: IntegrationSetting[];
    [key: string]: unknown;
}

export default function IntegrationsIndex({ config, integrations }: Props) {
    const [editingIntegration, setEditingIntegration] = useState<IntegrationSetting | null>(null);
    const [formData, setFormData] = useState<{
        is_enabled: boolean;
        credentials: Record<string, string>;
        settings: Record<string, string>;
    }>({
        is_enabled: false,
        credentials: {},
        settings: {},
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'connected':
                return 'text-green-600 bg-green-50 border-green-200';
            case 'disconnected':
                return 'text-gray-600 bg-gray-50 border-gray-200';
            case 'error':
                return 'text-red-600 bg-red-50 border-red-200';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getServiceIcon = (serviceName: string) => {
        switch (serviceName) {
            case 'google_calendar': return '📅';
            case 'google_sheets': return '📊';
            case 'whatsapp': return '💬';
            case 'email': return '✉️';
            case 'slack': return '💼';
            case 'notion': return '📝';
            default: return '🔗';
        }
    };

    const getServiceFields = (serviceName: string) => {
        switch (serviceName) {
            case 'google_calendar':
                return [
                    { key: 'client_id', label: 'Google Client ID', type: 'text', required: true },
                    { key: 'client_secret', label: 'Google Client Secret', type: 'password', required: true },
                    { key: 'default_calendar_id', label: 'Default Calendar ID', type: 'text', required: false },
                ];
            case 'google_sheets':
                return [
                    { key: 'service_account_key', label: 'Service Account Key (JSON)', type: 'textarea', required: true },
                    { key: 'default_spreadsheet_id', label: 'Default Spreadsheet ID', type: 'text', required: false },
                ];
            case 'whatsapp':
                return [
                    { key: 'phone_number_id', label: 'Phone Number ID', type: 'text', required: true },
                    { key: 'access_token', label: 'Access Token', type: 'password', required: true },
                    { key: 'webhook_verify_token', label: 'Webhook Verify Token', type: 'text', required: false },
                ];
            case 'email':
                return [
                    { key: 'smtp_host', label: 'SMTP Host', type: 'text', required: true },
                    { key: 'smtp_port', label: 'SMTP Port', type: 'number', required: true },
                    { key: 'username', label: 'Username', type: 'text', required: true },
                    { key: 'password', label: 'Password', type: 'password', required: true },
                    { key: 'from_name', label: 'From Name', type: 'text', required: false },
                    { key: 'encryption', label: 'Encryption', type: 'select', options: ['none', 'tls', 'ssl'], required: false },
                ];
            default:
                return [];
        }
    };

    const handleEdit = (integration: IntegrationSetting) => {
        setEditingIntegration(integration);
        setFormData({
            is_enabled: integration.is_enabled,
            credentials: integration.credentials || {},
            settings: integration.settings || {},
        });
    };

    const handleSave = () => {
        if (!editingIntegration) return;

        router.post('/integrations', {
            chatbot_config_id: config.id,
            service_name: editingIntegration.service_name,
            display_name: editingIntegration.display_name,
            is_enabled: formData.is_enabled,
            credentials: formData.credentials,
            settings: formData.settings,
        }, {
            onSuccess: () => {
                setEditingIntegration(null);
                setFormData({
                    is_enabled: false,
                    credentials: {},
                    settings: {},
                });
            }
        });
    };

    const handleTest = (integration: IntegrationSetting) => {
        router.patch(`/integrations/${integration.id}`, {
            action: 'test'
        });
    };

    const handleDisconnect = (integration: IntegrationSetting) => {
        if (confirm(`Are you sure you want to disconnect ${integration.display_name}?`)) {
            router.patch(`/integrations/${integration.id}`, {
                action: 'disconnect'
            });
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Never';
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <AppShell>
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <Heading title="🔗 External Integrations" />
                        <p className="text-gray-600 mt-2">
                            Connect external services to <strong>{config.name}</strong>
                        </p>
                    </div>
                    <Button 
                        variant="outline"
                        onClick={() => router.get(`/chatbot-configs/${config.id}`)}
                    >
                        ← Back to Chatbot
                    </Button>
                </div>

                {/* Integrations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {integrations.map((integration) => (
                        <div key={integration.id} className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="text-3xl">
                                        {getServiceIcon(integration.service_name)}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {integration.display_name}
                                        </h3>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(integration.status)}`}>
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
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEdit(integration)}
                                >
                                    ⚙️ Configure
                                </Button>
                            </div>

                            {/* Status Details */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Last Sync:</span>
                                    <span className="text-gray-900">{formatDate(integration.last_sync_at)}</span>
                                </div>
                                {integration.error_message && (
                                    <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
                                        <strong>Error:</strong> {integration.error_message}
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-2">
                                {integration.status === 'connected' && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleTest(integration)}
                                        className="text-blue-600"
                                    >
                                        🔍 Test
                                    </Button>
                                )}
                                {integration.is_enabled && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDisconnect(integration)}
                                        className="text-red-600"
                                    >
                                        🔌 Disconnect
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Configuration Modal */}
                {editingIntegration && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Configure {editingIntegration.display_name}
                                </h3>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setEditingIntegration(null)}
                                >
                                    ✕
                                </Button>
                            </div>

                            <div className="space-y-6">
                                {/* Enable/Disable Toggle */}
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        id="enabled"
                                        checked={formData.is_enabled}
                                        onChange={(e) => setFormData(prev => ({ ...prev, is_enabled: e.target.checked }))}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <label htmlFor="enabled" className="text-sm font-medium text-gray-700">
                                        Enable this integration
                                    </label>
                                </div>

                                {/* Credentials Fields */}
                                {formData.is_enabled && (
                                    <div className="space-y-4">
                                        <h4 className="text-lg font-medium text-gray-900">
                                            🔐 Authentication & Settings
                                        </h4>
                                        {getServiceFields(editingIntegration.service_name).map((field) => (
                                            <div key={field.key}>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {field.label} {field.required && <span className="text-red-500">*</span>}
                                                </label>
                                                {field.type === 'textarea' ? (
                                                    <textarea
                                                        value={formData.credentials[field.key] || ''}
                                                        onChange={(e) => setFormData(prev => ({
                                                            ...prev,
                                                            credentials: {
                                                                ...prev.credentials,
                                                                [field.key]: e.target.value
                                                            }
                                                        }))}
                                                        rows={4}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        placeholder={`Enter ${field.label.toLowerCase()}`}
                                                    />
                                                ) : field.type === 'select' ? (
                                                    <select
                                                        value={formData.credentials[field.key] || ''}
                                                        onChange={(e) => setFormData(prev => ({
                                                            ...prev,
                                                            credentials: {
                                                                ...prev.credentials,
                                                                [field.key]: e.target.value
                                                            }
                                                        }))}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    >
                                                        <option value="">Select option</option>
                                                        {field.options?.map((option: string) => (
                                                            <option key={option} value={option}>{option}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <input
                                                        type={field.type}
                                                        value={formData.credentials[field.key] || ''}
                                                        onChange={(e) => setFormData(prev => ({
                                                            ...prev,
                                                            credentials: {
                                                                ...prev.credentials,
                                                                [field.key]: e.target.value
                                                            }
                                                        }))}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        placeholder={`Enter ${field.label.toLowerCase()}`}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-200">
                                    <Button 
                                        variant="outline"
                                        onClick={() => setEditingIntegration(null)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSave}>
                                        💾 Save Configuration
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Help Section */}
                <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
                    <div className="flex items-start space-x-3">
                        <div className="text-2xl">🔐</div>
                        <div>
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">
                                Integration Security
                            </h3>
                            <div className="text-blue-800 text-sm space-y-2">
                                <p>
                                    • All credentials are <strong>encrypted</strong> and stored securely in the database
                                </p>
                                <p>
                                    • API keys and tokens are never logged or exposed in plain text
                                </p>
                                <p>
                                    • Test connections to verify credentials before enabling integrations
                                </p>
                                <p>
                                    • You can disconnect integrations at any time to revoke access
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}