#!/bin/bash
npm install
mkdir -p assets/swagger/models # We prepare swagger folder
npm run doc # We publish swagger documentation
