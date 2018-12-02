# Wikompose

Take notes, for yourself and others.

# Development tips

Here are some useful notes for contributing.

## Run the app ...

Once you checked out the project, install all dependencies through NPM:

```
npm install
```

### ... with Electron

To run the app with Electron, simply start:

```
npm run start
```

### ... in the browser

To run the app in the browser you need to start 2 processes:

 - the _backend_ (Rest-API handled by Express):
   ```
   cd wikompose-main && npm run start
   ```
 
 - the _frontend_ (handled by Angular):
   ```
   cd wikompose-ui && npm run start
   ```

The app is then available on <http://localhost:4220>
