#!/usr/bin/env node

// Test script for the complete referral system flow
const fs = require('fs').promises;
const path = require('path');

const BASE_URL = 'http://localhost:3001';

async function testAPI(endpoint, method = 'GET', body = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        const data = await response.json();
        
        console.log(`\n${method} ${endpoint}:`);
        console.log(`Status: ${response.status}`);
        console.log(`Response:`, JSON.stringify(data, null, 2));
        
        return { success: response.ok, data, status: response.status };
    } catch (error) {
        console.error(`Error testing ${endpoint}:`, error.message);
        return { success: false, error: error.message };
    }
}

async function testReferralSystem() {
    console.log('🧪 Testing Referral System End-to-End Flow');
    console.log('=' .repeat(50));

    // 1. Seed demo data first
    console.log('\n1. 🌱 Seeding demo data...');
    const seedResult = await testAPI('/api/referrals/demo', 'POST', { action: 'seed_demo_data' });
    
    if (!seedResult.success) {
        console.error('❌ Failed to seed demo data');
        return;
    }
    console.log('✅ Demo data seeded successfully');

    // 2. Get referral stats
    console.log('\n2. 📊 Fetching referral stats...');
    const statsResult = await testAPI('/api/referrals/demo', 'POST', { action: 'get_stats' });
    
    if (statsResult.success) {
        console.log('✅ Referral stats retrieved successfully');
    }

    // 3. Test referral code validation
    console.log('\n3. 🔍 Testing referral code validation...');
    const validateResult = await testAPI('/api/referrals', 'POST', {
        action: 'validate_code',
        code: 'ALEX2024',
        userId: 'temp_user'
    });
    
    if (validateResult.success && validateResult.data.valid) {
        console.log('✅ Referral code validation working');
    } else {
        console.log('❌ Referral code validation failed');
    }

    // 4. Test user registration with referral
    console.log('\n4. 👤 Testing user registration with referral...');
    const registerResult = await testAPI('/api/auth/register', 'POST', {
        fullName: 'Test User',
        email: 'testuser@stanford.edu',
        password: 'testpassword123',
        university: 'Stanford University',
        major: 'Computer Science',
        year: 'Sophomore',
        referralCode: 'ALEX2024'
    });
    
    if (registerResult.success) {
        console.log('✅ User registration with referral working');
        
        // 5. Process the referral after registration
        console.log('\n5. 🎁 Processing referral reward...');
        const rewardResult = await testAPI('/api/referrals', 'POST', {
            action: 'process_referral',
            code: 'ALEX2024',
            userId: registerResult.data.userId
        });
        
        if (rewardResult.success) {
            console.log('✅ Referral reward processed successfully');
        } else {
            console.log('❌ Referral reward processing failed');
        }
    } else {
        console.log('❌ User registration failed');
    }

    // 6. Test fetching user referrals
    console.log('\n6. 📋 Testing user referrals fetch...');
    const userReferralsResult = await testAPI('/api/referrals?userId=user1');
    
    if (userReferralsResult.success) {
        console.log('✅ User referrals fetch working');
    }

    // 7. Test creating new referral code
    console.log('\n7. 🆕 Testing new referral code creation...');
    const newCodeResult = await testAPI('/api/referrals', 'POST', {
        action: 'create_code',
        userId: 'user1',
        customCode: 'TESTCODE2024'
    });
    
    if (newCodeResult.success) {
        console.log('✅ New referral code creation working');
    }

    console.log('\n🎉 Referral system testing completed!');
    console.log('Check the browser at http://localhost:3001 to test the UI flows');
    console.log('\nSuggested manual tests:');
    console.log('1. Visit /signup?ref=ALEX2024 to test signup with referral');
    console.log('2. Visit /referrals to see the main referral dashboard');
    console.log('3. Visit /referrals/analytics to see analytics');
    console.log('4. Test sharing referral codes');
    console.log('5. Check notifications for referral events');
}

// Run the test if called directly
if (require.main === module) {
    // Add fetch polyfill for Node.js
    if (!global.fetch) {
        global.fetch = require('node-fetch');
    }
    
    testReferralSystem().catch(console.error);
}

module.exports = { testReferralSystem, testAPI };
