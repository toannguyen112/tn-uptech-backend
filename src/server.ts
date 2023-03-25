import { MediaRoute } from './route/media.route';
import { FolderRoute } from './route/folder.route';
import { App } from './infra/express/app';
import { ProjectRoute } from './route/project.route';

const routers = [
    new FolderRoute(),
    new MediaRoute(),
    new ProjectRoute(),
];

const app = new App([...routers]);

app.listen();