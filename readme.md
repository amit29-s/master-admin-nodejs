# Redefine ADMIN

This service will manage ADMIN module

## Run Steps

Run `npm install` to install dependencies.

### Intalling NPS

It's recommended that you either install it globally `npm i -g nps` or add ./node_modules/bin to your $PATH (be careful that you know what you're doing when doing this).

#### For Dev Environment

Run `npm run dev` to run the application.

#### For Dev Build Environment

Run `npm run build-dev` to build the application.
Run `npm run start` to run the application.

#### For Prod Build Environment

Run `npm run build-prod` to build the application.
Run `npm run start` to run the application.

### Databases

| Database | Version |
| -------- | ------- |
| MongoDB  | latest  |

### Ports

| Database | Version |
| -------- | ------- |
| Mongo    | 27017   |
| Service  | 80      |

### Environment Configuration

#### To configure the application, you need to create three environment files in the root directory of the project:

     .env: This file should contain the environment variables common to all environments (e.g., development, production). These variables will be used as the default unless overridden by environment-specific files.

     .env.development: This file is used for environment variables specific to the development environment. It will override any variables defined in the .env file when running the application in development mode.

     .env.production: This file is for environment variables specific to the production environment. It will override any variables defined in the .env file when running the application in production mode.

     .env.template: This file is template for environment variables that needs to be add in other env files. Please don't add any sensitive information in this file.

### Environment Variables

| Environment Variable      | Description                                            | Default Value                        |
| ------------------------- | ------------------------------------------------------ | ------------------------------------ |
| APP_NAME                  | Name of the application                                | `ECOMMERCE_API`                      |
| APP_SCHEMA                | Application schema (http or https)                     | `http`                               |
| APP_HOST                  | Application host                                       | `localhost`                          |
| APP_PORT                  | Port on which the application runs                     | `8080`                               |
| APP_ROUTE_PREFIX          | API route prefix                                       | `/ecommerce/v1`                      |
| APP_BANNER                | Display application banner in console                  | `false`                              |
| JWT_SECRET                | Secret key for signing JWT tokens                      | `redefine!@solution`                 |
| JWT_EXPIRES               | JWT token expiration time                              | `1d`                                 |
| REFRESH_EXPIRES           | Refresh token expiration time                          | `2d`                                 |
| FORGET_PASS_TOKEN_EXP_MIN | Expiration time (in minutes) for forget password token | `3600`                               |
| UPLOAD_PATH               | Path to store uploaded files                           | `./uploads`                          |
| LOG_LEVEL                 | Logging level (e.g., debug, info, warn, error)         | `debug`                              |
| LOG_OUTPUT                | Logging output format (e.g., dev, json)                | `dev`                                |
| MONGO_DB_USERNAME         | Username for MongoDB connection                        | ``                                   |
| MONGO_DB_PASSWORD         | Password for MongoDB connection                        | ``                                   |
| MONGO_DB_HOST             | Host for MongoDB connection                            | ``                                   |
| MONGO_DB_PORT             | Port for MongoDB connection                            | ``                                   |
| MONGO_DB_NAME             | Name of the MongoDB database                           | ``                                   |
| CONTROLLERS               | Path to the application's controller files             | `src/controllers/**/*.controller.ts` |
| MIDDLEWARES               | Path to the application's middleware files             | `src/middlewares/**/*.middleware.ts` |
| FRONTEND_BASE_URL         | Base URL of the frontend application                   | ``                                   |
| WEB_BASEURL               | Base URL for the web application                       | ``                                   |
