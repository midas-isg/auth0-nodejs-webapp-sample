# MIDAS SSO Example using Node.js

This example of a regular web application using Node.js, Express.js, midas-sso and Auth0.

## Hook up to midass-sso

This example shows how to hook up to midass-sso and perform an authorization check for the logged in user. After user signs up to midas-sso via MIDAS Accounts, the user will automatically get `ISG_USER` role so that the user can access `/user`. This example checks for a role of `ISG_ADMIN` which user usually won't get and, if the user tries to access the `/admin` route, redirects the user to the `/unauthorized`.

## Running the Sample

Install the dependencies.

```bash
npm install
```

Rename `.env.example` to `.env` and replace the values for `AUTH0_CLIENT_ID`, `AUTH0_DOMAIN`, and `AUTH0_CLIENT_SECRET` with your Auth0 credentials. If you don't yet have an MIDAS SSO account, [sign up](https://docs.google.com/forms/d/e/1FAIpQLScz9GcXNQ8bBLiQ9WQMyXdXdGCcb1iIyd8phdXz4POPOL2LCQ/viewform?c=0&w=1) for free.

```bash
# copy configuration and replace with your own
cp .env.example .env
```

Run the app.

```bash
npm start
```

The app will be served at `localhost:3000`.

## Credit
This was forked from auth0-samples/auth0-nodejs-webapp-sample