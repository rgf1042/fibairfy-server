#!/bin/bash
echo "Installing dependencies..."
npm install
echo "Starting tests..."
npm run test-dev
