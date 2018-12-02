import * as express from 'express';
import { ElectronRouterService } from './services/electron-router.service';

const app = express();

// Default options
const opts: { [key: string]: any } = {
  port: 3000
};

// Extracting options passed as argument
process.argv.forEach((value) => {
  if (value.startsWith('--') && value.includes('=')) {
    const params = value.split('=', 2);
    const optName = params[0].substr(2);
    opts[optName] = params[1];
  }
});

// Initializing router
var electronRouterService = new ElectronRouterService(app, false);
electronRouterService.init();

// Starting the app on port defined through options
app.listen(opts.port, function () {
  console.log('Wikompose main app started on port:' + opts.port);
});
