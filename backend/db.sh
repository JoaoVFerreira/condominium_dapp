#!/bin/bash

# Load .env
source .env

# Create container for a postgresql image
docker run --name condominium -p 5432:5432 -e POSTGRES_PASSWORD=$DB_PASSWORD -e POSTGRES_USER=$DB_USERNAME -e POSTGRES_DB=$DB_NAME -d postgres:12