import { FolderRoute } from './src/route/folder.route';
import { App } from './src/infra/express/app';

const app = new App([new FolderRoute()]);

app.listen();