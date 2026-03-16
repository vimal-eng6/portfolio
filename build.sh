#!/usr/bin/env bash
# Exit on error
set -o errexit

cd backend
# Run the actual build script
chmod +x build.sh
./build.sh
