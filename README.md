# GitHub organization dashboard

A simple app to show a summary for a GitHub organization.

## Setup

You'll need a GitHub API token; you can [generate one here](https://github.com/settings/tokens).

Make sure you have Node.js v12 installed. This is easiest by using the
[`Node Versions Manager (nvm)`](https://github.com/nvm-sh/nvm) tool:

```
  # (not shown) Install nvm

  # Install (and activate) Node.js v12
  nvm install 12

  # (not shown) Install yarn; instructions at https://yarnpkg.com/lang/en/docs/install 

  # Create and edit the server's "dotenv" file, adding your GitHub API token.
  cp server/.env.template server/.env
  $EDITOR server/.env

  # Install dependencies
  yarn

  # Start the app
  yarn start
```

Now you can visit the app at [http://localhost:3000/](http://localhost:3000/).

Both server and client are "watched," so changes will result in recompilation (for the client) and
restarting (for the server), but you'll have to manually reload your web browser to see client
changes.

## Limitations

1. No production mode/deployment included. The app is running in development mode, via
   create-react-app's proxy, which means non-optimized front-end builds only, and API requests
   proxied through a webpack dev server to the node server, which itself is running in development
   mode under nodemon.
2. Contributors endpoint makes N+1 requests (where N is the number of repositories) to GitHub's
   API--not scalable for large numbers of repositories. It's possible I overlooked a way to get this
   data with one call. Perhaps GitHub's GraphQL interface would allow it.
3. Data overfetching: GitHub's REST API returns All The Data (tons of fields about each repository
   or contributor, for instance), and this app uses very little of it. The only reason I didn't use
   GitHub's GraphQL API is because I haven't before, and I have little GraphQL experience.
4. The UI is pretty ugly, showing one really long page of three tables, and no graphs or charts.
