// Test script to verify API endpoints are working
async function testAPIs() {
    const baseURL = 'http://localhost:3000';

    console.log('🧪 Testing API endpoints...\n');

    // Test endpoints
    const endpoints = [
        { path: '/api/users', method: 'GET', name: 'Users API' },
        { path: '/api/posts', method: 'GET', name: 'Posts API' },
        { path: '/api/comments', method: 'GET', name: 'Comments API' },
        { path: '/api/follows', method: 'GET', name: 'Follows API' }
    ];

    for (const endpoint of endpoints) {
        try {
            console.log(`Testing ${endpoint.name} (${endpoint.method} ${endpoint.path})...`);

            const response = await fetch(`${baseURL}${endpoint.path}`, {
                method: endpoint.method,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const status = response.status;
            const statusText = response.statusText;

            if (status === 200) {
                console.log(`✅ ${endpoint.name}: ${status} ${statusText}`);
                try {
                    const data = await response.json();
                    console.log(`   Response: ${JSON.stringify(data).substring(0, 100)}...`);
                } catch (e) {
                    console.log(`   Response: Non-JSON response`);
                }
            } else if (status === 401) {
                console.log(`🔒 ${endpoint.name}: ${status} ${statusText} (Authentication required)`);
            } else {
                console.log(`⚠️  ${endpoint.name}: ${status} ${statusText}`);
            }

        } catch (error) {
            console.log(`❌ ${endpoint.name}: Error - ${error.message}`);
        }

        console.log('');
    }

    console.log('🎯 API tests completed!');
}

// Run the tests
testAPIs().catch(console.error);
