#!/bin/sh


cd frontend || exit 1

echo "Creating .env file..."
cp .env.example .env

echo "Installing dependencies in frontend..."
yarn install

echo "Building frontend..."
yarn build

echo "Starting frontend..."
yarn preview
