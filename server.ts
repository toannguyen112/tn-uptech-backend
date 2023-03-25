import { MediaRoute } from './src/route/media.route';
import { FolderRoute } from './src/route/folder.route';
import { App } from './src/infra/express/app';

const routers = [
    new FolderRoute(),
    new MediaRoute(),
];

const app = new App([...routers]);

app.listen();