import * as express from 'express';
import * as cors from 'cors';
import { WikomposeMainApp } from './wikompose-main-app';
import * as bodyParser from 'body-parser';

const app = express();

// Default options
const opts: { [key: string]: any } = {
  port: 3000
};

app.use(cors());
app.use(bodyParser.json());

// Extracting options passed as argument
process.argv.forEach((value) => {
  if (value.startsWith('--') && value.includes('=')) {
    const params = value.split('=', 2);
    const optName = params[0].substr(2);
    opts[optName] = params[1];
  }
});

// Initializing app
const mainApp = new WikomposeMainApp(app, false);
mainApp.init();

// Starting the app on port defined through options
app.listen(opts.port, function () {
  console.log('Wikompose main app started on port:' + opts.port);
});
