#!/bin/bash

# Navigate to ./vue-src and run build
cd ./vue-src
npm run lint
npm run format
npm run build
cd ..

# Go back to root and build the app
neu update # download binaries to /bin directory
neu build # creates dist/ folder with packaged apps