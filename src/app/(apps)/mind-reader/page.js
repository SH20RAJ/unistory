"use client";

import { useState } from "react";
import { useAppAccess } from '@/hooks/use-premium';
import PremiumGate from '@/components/premium/PremiumGate';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

export default function MindReadingPage() {
    const { hasAccess } = useAppAccess('Mind Reader');
    
    return (
        <>
            {!hasAccess && <PremiumGate appName="Mind Reader" appIcon={Brain} />}
            {hasAccess && (
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Brain className="w-5 h-5" />
                                <span>Mind Reader</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Mind reader app content coming soon...</p>
                            <Button className="mt-4">Get Started</Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    );
}


