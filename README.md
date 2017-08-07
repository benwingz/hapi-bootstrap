# Skilvioo API Bootstrap

This is a bootstrap to help skilvioo devs to initiate new api.

## Configuration file

Before launching the server you will need to create a env.js file in a config/ folder at the root of the project (`./config/env.js`). Here is an exemple:

```
const env = {
  DEV: {
    DATABASE: {
      URI: 'bolt://localhost:7687',
      USER: 'neo4j',
      PASSWORD: 'root',
    },
    authentication: {
      secret: ['s4Jpy2ZwcRmg3wRQTHoQ', 'jx7aZlvYdfknrleqFmSl'],
    },
  },
  PROD: {
    DATABASE: {
      URI: '',
      USER: '',
      PASSWORD: '',
    },
    authentication: {
      secret: ['s4Jpy2ZwcRmg3wRQTHoQ', 'jx7aZlvYdfknrleqFmSl'],
    },
  },
};

module.exports = env;
```

## Git linter configuration

pre-commit hook for linter is in `hooks/` folder. In order to be use you have to run this command when setting your dev env `cp hooks/pre-commit-eslint .git/hooks/pre-commit | chmod +x .git/hooks/pre-commit`

## Fork
To fork this project, first add the upstream to your remote
``` git remote add upstream git@git.skilvioo.com:team/skilvioo-api-bootstrap.git ```

You can check by doing
``` git remote -v ```

You should see
```
origin          git@git.skilvioo.com:YOURUSERNAME/skilvioo-api-bootstrap.git (fetch)
origin          git@git.skilvioo.com:YOURUSERNAME/skilvioo-api-bootstrap.git (push)
upstream        git@git.skilvioo.com:YOURUSERNAME/skilvioo-api-bootstrap.git (fetch)
upstream        git@git.skilvioo.com:YOURUSERNAME/skilvioo-api-bootstrap.git (push)
```

You can update your own fork
``` git pull upstream master ```

## Hapi

This api bootstrap is using [Hapi](https://hapijs.com/) framework to serve api endpoints.

## OpenApi/Swagger auto-documentation

This api bootstrap is using OpenApi standard for generate auto-documentation. Once the server is launch you can access the testable documentation via `/documentation` endpoint or access OpenApi json description with this endpoint `swagger-doc`.

## Server launch

* For launching DEV server with livereload use the command line `npm run start-dev` (livereload using [nodemon](https://github.com/remy/nodemon)).
* For launching PROD server with node use the command line `npm run start-prod`

## Authentication

This boostrap is using [JWT](https://jwt.io/)(Json web token) for authentication, sent in the header of the request with the key `Authorization`.
In order to generate the JWT token you'll need to use the secret in `./config/env.js`.

## Dependencies:

For install dependencies use `npm i` command line.

### Dev dependencies:

* babel-eslint
* eslint
* eslint-config-airbnb
* eslint-plugin-import
* eslint-plugin-jsx-a11y
* eslint-plugin-react
* nodemon
* hapi-cors

### Prod Dependencies:

* hapi
* hapi-auth-jwt2
* hapi-swagger
* hapi-swaggered
* hapi-swaggered-ui
* inert
* joi
* vision

### Integration test
Run npm run test-dev