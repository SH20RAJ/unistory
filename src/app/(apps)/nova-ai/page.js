'use client';
import { useState } from 'react';
import { useAppAccess } from '@/hooks/use-premium';
import PremiumGate from '@/components/premium/PremiumGate';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot } from 'lucide-react';

export default function NovaAI() {
    const { hasAccess } = useAppAccess('Nova AI');
    
    return (
        <>
            {!hasAccess && <PremiumGate appName="Nova AI" appIcon={Bot} />}
            {hasAccess && (
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Bot className="w-5 h-5" />
                                <span>Nova AI</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Nova AI content coming soon...</p>
                            <Button className="mt-4">Get Started</Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    );
}