import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    auth: {
        user: unknown;
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span className="text-2xl font-bold text-gray-900">🤖 ChatBot Manager</span>
                        </Link>
                    </div>
                    <div className="flex lg:flex-1 lg:justify-end space-x-4">
                        {auth.user ? (
                            <Link href="/dashboard">
                                <Button>Dashboard</Button>
                            </Link>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="outline">Log in</Button>
                                </Link>
                                <Link href="/register">
                                    <Button>Get Started</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            🚀 Advanced Chatbot
                            <span className="text-blue-600"> Configuration Manager</span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                            Build, configure, and deploy intelligent chatbots with powerful integrations. 
                            Manage knowledge bases, enable tools, and connect to external services - all from one comprehensive platform.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            {auth.user ? (
                                <Link href="/dashboard">
                                    <Button size="lg" className="text-lg px-8 py-4">
                                        🎛️ Open Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/register">
                                        <Button size="lg" className="text-lg px-8 py-4">
                                            🎯 Start Building
                                        </Button>
                                    </Link>
                                    <Link href="/login">
                                        <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                                            📊 View Demo
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            ⚡ Everything You Need to Build Smart Chatbots
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Professional-grade tools for creating, managing, and deploying AI assistants
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Chatbot Configuration */}
                        <div className="relative bg-white p-8 shadow-xl ring-1 ring-gray-200 rounded-2xl hover:shadow-2xl transition-shadow">
                            <div className="text-center">
                                <div className="text-4xl mb-4">🤖</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Bot Configuration
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Set up chatbot personality, greetings, fallback messages, and behavioral traits. 
                                    Create unique AI assistants tailored to your needs.
                                </p>
                            </div>
                        </div>

                        {/* Knowledge Base */}
                        <div className="relative bg-white p-8 shadow-xl ring-1 ring-gray-200 rounded-2xl hover:shadow-2xl transition-shadow">
                            <div className="text-center">
                                <div className="text-4xl mb-4">📚</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Knowledge Base
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Upload documents for RAG (Retrieval Augmented Generation). 
                                    Support for PDFs, Word docs, and text files with automatic content extraction.
                                </p>
                            </div>
                        </div>

                        {/* Tool Registry */}
                        <div className="relative bg-white p-8 shadow-xl ring-1 ring-gray-200 rounded-2xl hover:shadow-2xl transition-shadow">
                            <div className="text-center">
                                <div className="text-4xl mb-4">🛠️</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Tool Registry
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Enable powerful tools like Google Calendar, Google Sheets, email sending, 
                                    and more. Mix and match capabilities for your chatbot.
                                </p>
                            </div>
                        </div>

                        {/* Integrations */}
                        <div className="relative bg-white p-8 shadow-xl ring-1 ring-gray-200 rounded-2xl hover:shadow-2xl transition-shadow">
                            <div className="text-center">
                                <div className="text-4xl mb-4">🔗</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Integrations
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Connect to WhatsApp, Slack, email systems, and Google services. 
                                    Secure credential management with API key storage.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Available Tools Showcase */}
                <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
                    <div className="mx-auto max-w-2xl text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            🧰 Pre-Built Tool Integrations
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Ready-to-use integrations for popular services and platforms
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                            <div className="text-3xl mb-2">📅</div>
                            <h4 className="font-semibold text-sm">Google Calendar</h4>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                            <div className="text-3xl mb-2">📊</div>
                            <h4 className="font-semibold text-sm">Google Sheets</h4>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                            <div className="text-3xl mb-2">💬</div>
                            <h4 className="font-semibold text-sm">WhatsApp</h4>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                            <div className="text-3xl mb-2">✉️</div>
                            <h4 className="font-semibold text-sm">Email SMTP</h4>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                            <div className="text-3xl mb-2">💼</div>
                            <h4 className="font-semibold text-sm">Slack</h4>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                            <div className="text-3xl mb-2">📝</div>
                            <h4 className="font-semibold text-sm">Notion</h4>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mx-auto max-w-4xl px-6 lg:px-8 pb-24">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl px-12 py-16 text-center">
                        <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
                            🎯 Ready to Build Your AI Assistant?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Join thousands of developers and businesses using our platform to create 
                            intelligent, capable chatbots that integrate seamlessly with their workflow.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            {auth.user ? (
                                <Link href="/dashboard">
                                    <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                                        🚀 Go to Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/register">
                                        <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                                            🎁 Start Free Trial
                                        </Button>
                                    </Link>
                                    <Link href="/login">
                                        <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600">
                                            📈 View Features
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}