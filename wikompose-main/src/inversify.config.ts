import { Container } from 'inversify';
import { Controller } from './controllers/router.decorators';
import { ConfigurationController } from './controllers/configuration.controller';
import { FilesController } from './controllers/files.controller';

export const Symbols = {
  Controller : Symbol.for("Controller")
};

const InversifyContainer = new Container({ defaultScope: 'Singleton', autoBindInjectable: true });

// Declaring all controllers
InversifyContainer.bind<Controller>(Symbols.Controller).to(ConfigurationController);
InversifyContainer.bind<Controller>(Symbols.Controller).to(FilesController);

export { InversifyContainer };
