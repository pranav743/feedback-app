#!/bin/sh

echo "Creating .env file..."
cp .env.example .env

echo "Installing dependencies in frontend..."
cd frontend || exit 1
yarn install

echo "Building frontend..."
yarn build

echo "Starting frontend..."
yarn preview
