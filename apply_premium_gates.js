#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const appDirectories = [
    'confessions', 'couple-of-the-week', 'dopamine-dealer', 'flirt-zone', 
    'future-bets', 'hot-not-swiping', 'journal', 'matchme-ai', 'memory-palace', 
    'mind-reader', 'newsroom', 'nova-ai', 'resources', 'secret-crush', 
    'social-credit', 'soul-twin', 'time-capsule', 'truth-bomb', 
    'virtual-date-ideas', 'wellness'
];

const basePath = '/Users/shaswatraj/Desktop/startups/unistory/src/app/(apps)';

const premiumImports = `import { useAppAccess } from '@/hooks/use-premium';
import PremiumGate from '@/components/premium/PremiumGate';`;

function getAppDisplayName(appDir) {
    return appDir.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function addPremiumGate(filePath, appName) {
    console.log(`Processing ${appName}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if already has premium imports
    if (content.includes('useAppAccess')) {
        console.log(`${appName} already has premium gates - skipping`);
        return;
    }
    
    // Add imports after existing imports
    const importRegex = /^(import[^;]+;[\s\S]*?)(\n\n|$)/m;
    const match = content.match(importRegex);
    
    if (match) {
        content = content.replace(match[0], match[1] + '\n' + premiumImports + '\n\n');
    } else {
        // Fallback: add at the beginning after 'use client' if present
        if (content.includes("'use client';")) {
            content = content.replace("'use client';", "'use client';\n" + premiumImports);
        } else if (content.includes('"use client";')) {
            content = content.replace('"use client";', '"use client";\n' + premiumImports);
        } else {
            content = premiumImports + '\n\n' + content;
        }
    }
    
    // Find the export default function
    const functionRegex = /export default function (\w+)\(\)\s*{/;
    const functionMatch = content.match(functionRegex);
    
    if (functionMatch) {
        const functionName = functionMatch[1];
        const premiumLogic = `    const { hasAccess } = useAppAccess('${appName}');
    
    // If user doesn't have access, show premium gate
    if (!hasAccess) {
        return <PremiumGate appName="${appName}" />;
    }
    
    `;
        
        // Insert premium logic after the function declaration
        content = content.replace(
            functionMatch[0],
            functionMatch[0] + '\n' + premiumLogic
        );
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Added premium gate to ${appName}`);
}

// Process each app
appDirectories.forEach(appDir => {
    const filePath = path.join(basePath, appDir, 'page.js');
    const appName = getAppDisplayName(appDir);
    
    if (fs.existsSync(filePath)) {
        addPremiumGate(filePath, appName);
    } else {
        console.log(`❌ File not found: ${filePath}`);
    }
});

console.log('\n🎉 Premium gate application completed!');
