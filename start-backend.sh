#!/bin/sh

echo "Creating .env file..."
cp .env.example .env

echo "Installing dependencies in backend..."
cd backend || exit 1
yarn install

echo "Building backend..."
yarn build

echo "Starting backend..."
yarn start
