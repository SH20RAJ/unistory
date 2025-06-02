#!/bin/bash

# Kill any existing Next.js processes
pkill -f "next dev"

# Clear any cache
rm -rf .next

# Start development server with memory optimization
export NODE_OPTIONS="--max-old-space-size=8192 --max-semi-space-size=512"
npm run dev
