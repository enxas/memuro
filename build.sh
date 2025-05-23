#!/bin/bash

# Navigate to ./vue-src and run build
cd ./vue-src
npm run build:neutralino
cd ..

# Go back to root and build the app
neu build