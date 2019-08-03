# GitHub organization dashboard

A simple app to show a summary for a GitHub organization.

## Setup

First, get a GitHub API token.

Then run:

```
  cp server/.env.template server/.env

  # Edit the server's "dotenv" file, adding your GitHub API token.
  $EDITOR server/.env

  # Start the app
  yarn start
```

## Limitations

1. No production mode/deployment included. The app is running in development mode, via
   create-react-app's proxy, which means non-optimized front-end builds only, and API requests
   proxied through a webpack dev server to the node server, which itself is running in development
   mode under nodemon.
