# Skilvioo User API

This is a bootstrap to help skilvioo devs to initiate new api.

## Git linter configuration

pre-commit hook for linter is in `hooks/` folder. In order to be use you have to run this command when setting your dev env `cp hooks/pre-commit-eslint .git/hooks/pre-commit | chmod +x .git/hooks/pre-commit`

## Hapi

This api bootstrap is using [Hapi](https://hapijs.com/) framework to serve api endpoints.

## OpenApi/Swagger auto-documentation

This api bootstrap is using OpenApi standard for generate auto-documentation. Once the server is lauch you can access the testable documentation via `/documentation` endpoint or access OpenApi json description with this endpoint `swagger-doc`. 

## Server launch

* For lauching DEV server with livereload use the command line `npm run start-dev` (livereload using [nodemon](https://github.com/remy/nodemon)).
* For lauching PROD server with node use the command line `npm run start-prod`

## Autentication

This boostrap is using [JWT](https://jwt.io/)(Json web token) for authentication, sent in the header of the request with the key `Authorization`.
In order to generate the JWT token you'll need to use the secret in `./config/env.js`.

## Dependencies list:

### Dev dependencies:

* babel-eslint
* eslint
* eslint-config-airbnb
* eslint-plugin-import
* eslint-plugin-jsx-a11y
* eslint-plugin-react
* nodemon

### Dependencies:

* hapi
* hapi-auth-jwt2
* hapi-swagger
* hapi-swaggered
* hapi-swaggered-ui
* inert
* joi
* vision
