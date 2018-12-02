import { Container } from "inversify";
import { ConfigurationService } from './services/configuration.service';
import { FileManagementService } from './services/file-management.service';

const InversifyContainer = new Container();
InversifyContainer.bind<ConfigurationService>(ConfigurationService).to(ConfigurationService);
InversifyContainer.bind<FileManagementService>(FileManagementService).to(FileManagementService);

export { InversifyContainer };
