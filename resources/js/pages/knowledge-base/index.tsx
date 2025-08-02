import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';

interface ChatbotConfig {
    id: number;
    name: string;
}

interface KnowledgeBaseDocument {
    id: number;
    title: string;
    filename: string;
    file_type: string;
    file_size: number;
    status: string;
    error_message?: string;
    created_at: string;
}

interface Props {
    config: ChatbotConfig;
    documents: KnowledgeBaseDocument[];
    [key: string]: unknown;
}

export default function KnowledgeBaseIndex({ config, documents }: Props) {
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [uploadData, setUploadData] = useState({
        title: '',
        document: null as File | null,
    });
    const [isUploading, setIsUploading] = useState(false);

    const formatFileSize = (bytes: number) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Bytes';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ready':
                return 'text-green-600 bg-green-50 border-green-200';
            case 'processing':
                return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'error':
                return 'text-red-600 bg-red-50 border-red-200';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getFileTypeIcon = (fileType: string) => {
        if (fileType.includes('pdf')) return '📄';
        if (fileType.includes('word') || fileType.includes('document')) return '📝';
        if (fileType.includes('text') || fileType.includes('plain')) return '📃';
        if (fileType.includes('markdown')) return '📋';
        return '📁';
    };

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault();
        if (!uploadData.document || !uploadData.title) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('title', uploadData.title);
        formData.append('document', uploadData.document);
        formData.append('chatbot_config_id', config.id.toString());

        router.post('/knowledge-base', formData, {
            onSuccess: () => {
                setShowUploadForm(false);
                setUploadData({ title: '', document: null });
                setIsUploading(false);
            },
            onError: () => {
                setIsUploading(false);
            }
        });
    };

    const handleDelete = (documentId: number, title: string) => {
        if (confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
            router.delete(`/knowledge-base/${documentId}`);
        }
    };

    return (
        <AppShell>
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <Heading title="📚 Knowledge Base" />
                        <p className="text-gray-600 mt-2">
                            Manage documents for <strong>{config.name}</strong>
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button 
                            variant="outline"
                            onClick={() => router.get(`/chatbot-configs/${config.id}`)}
                        >
                            ← Back to Chatbot
                        </Button>
                        <Button onClick={() => setShowUploadForm(true)}>
                            📤 Upload Document
                        </Button>
                    </div>
                </div>

                {/* Upload Form Modal */}
                {showUploadForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                📤 Upload Document
                            </h3>
                            <form onSubmit={handleUpload} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Document Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={uploadData.title}
                                        onChange={(e) => setUploadData(prev => ({ ...prev, title: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g., Product Documentation"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select File *
                                    </label>
                                    <input
                                        type="file"
                                        onChange={(e) => setUploadData(prev => ({ ...prev, document: e.target.files?.[0] || null }))}
                                        accept=".pdf,.doc,.docx,.txt,.md"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Supported: PDF, Word documents, text files, Markdown (max 10MB)
                                    </p>
                                </div>
                                <div className="flex items-center justify-end space-x-2 pt-4">
                                    <Button 
                                        type="button" 
                                        variant="outline"
                                        onClick={() => setShowUploadForm(false)}
                                        disabled={isUploading}
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        type="submit"
                                        disabled={isUploading || !uploadData.title || !uploadData.document}
                                    >
                                        {isUploading ? '⏳ Uploading...' : '📤 Upload'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Documents List */}
                {documents.length > 0 ? (
                    <div className="grid gap-4">
                        {documents.map((doc) => (
                            <div key={doc.id} className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-4">
                                        <div className="text-3xl">
                                            {getFileTypeIcon(doc.file_type)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {doc.title}
                                                </h3>
                                                <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(doc.status)}`}>
                                                    {doc.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                                                <span>{doc.filename}</span>
                                                <span>•</span>
                                                <span>{formatFileSize(doc.file_size)}</span>
                                                <span>•</span>
                                                <span>Uploaded {formatDate(doc.created_at)}</span>
                                            </div>
                                            {doc.status === 'error' && doc.error_message && (
                                                <p className="text-red-600 text-sm mt-2">
                                                    Error: {doc.error_message}
                                                </p>
                                            )}
                                            {doc.status === 'processing' && (
                                                <p className="text-yellow-600 text-sm mt-2">
                                                    Processing document for RAG indexing...
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => handleDelete(doc.id, doc.title)}
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
                        <div className="text-6xl mb-6">📚</div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                            No Documents Yet
                        </h3>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            Upload documents to build your chatbot's knowledge base. These files will be 
                            processed for RAG (Retrieval Augmented Generation) to help your bot answer questions.
                        </p>
                        <Button size="lg" onClick={() => setShowUploadForm(true)}>
                            📤 Upload Your First Document
                        </Button>
                    </div>
                )}
            </div>
        </AppShell>
    );
}