#!/bin/sh
set -e

echo "Setting up the database..."
npx medusa db:setup --db tb-store

echo "Running migrations..."
npx medusa db:migrate

echo "Seeding the database..."
npx medusa exec ./src/scripts/seed-mn.ts

echo "Creating admin user..."
npx medusa user -e admin@tb-store.mn -p 'P@ssw0rd!@#'

exec "$@"
