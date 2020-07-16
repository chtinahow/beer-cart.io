# beer-cart.io

## Development instructions
1. In the root directory, run `npm install` to install all the project dependencies
2. Run `npm start` to start the dev server
3. Navigate to http://localhost:1234 (or the url provided after running `npm start`)
4. Open a second terminal
5. Go to the `/functions` directory, and run `npm install`
6. Run the emulator for hosting, functions, and the db: `npm run serve:hosting`
7. If you want to log in, you'll have to switch the `access.js` from `access-prod` to `access-dev`.

## Deployment Instructions
1. Run `npm run build`
2. cd into the `/functions` directory
3. Run `npm run deploy:hosting`

## Development commands
Below are a list of commands used for development. The logic for all the commands is in the local `package.json`
- `npm start` - starts a server hosting the webapp on localhost using
[Parcel](https://parceljs.org/)
and will watch for changes
- `npm run build` - builds a final distributable using
[Parcel](https://parceljs.org/)
- `npm test` - runs tests in
[Jest](https://jestjs.io/)
- `npm run lint` - runs linting on the project based on [xo](https://github.com/xojs/xo) and the [tram-one-eslint-config](https://github.com/Tram-One/eslint-config-tram-one)
