#!/bin/sh

echo "Installing dependencies in backend..."
cd backend || exit 1
yarn install

echo "Installing dependencies in frontend..."
cd ../frontend || exit 1
yarn install

echo "Building backend..."
cd ../backend || exit 1
yarn build

echo "Starting backend..."
yarn start & 

echo "Building frontend..."
cd ../frontend || exit 1
yarn build

echo "Starting frontend..."
yarn preview
