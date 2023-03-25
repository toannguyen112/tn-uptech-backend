import { MediaRoute } from './route/media.route';
import { FolderRoute } from './route/folder.route';
import { App } from './infra/express/app';

const routers = [
    new FolderRoute(),
    new MediaRoute(),
];

const app = new App([...routers]);

app.listen();