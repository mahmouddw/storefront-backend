# Storefront Backend Project

## Overview
Storefront backend to showcase the company product ideas. Users are able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page.

## Instruction
1- In psql run `CREATE DATABASE postgres_db;` to create the database.
2- In psql run `CREATE DATABASE postgres_db_test;` to create the testing database.
3- In terminal run `npm install` to install node modules.
4- run `db-migrate up` to create tables, and to insert products in table `products`.
5- run `npm run watch` to start running the application, port (3000).
6- run `npm run test` to run tests with Jasmine and Supertest.

## Required Technologies
The application uses of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## ENV variables (please note that I have submitted .env file with the project as well. because it's a ZIP file, not using GITHUB)
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=postgres_db
POSTGRES_DB_TEST=postgres_db_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password123
ENV=dev
BCRYPT_PASSWORD=key
SALT_ROUNDS=10
TOKEN_SECRET=sc

## Author name
Mahmoud Ahmed