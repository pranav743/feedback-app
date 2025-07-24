#!/bin/sh

cd backend || exit 1
echo "Creating .env file..."
cp .env.example .env

echo "Installing dependencies in backend..."
yarn install

echo "Building backend..."
yarn build

echo "Starting backend..."
yarn start
