import { MediaRoute } from './route/media.route';
import { FolderRoute } from './route/folder.route';
import { App } from './infra/express/app';
import { ProjectRoute } from './route/project.route';
import { PostRoute } from './route/post.route';
import { LocaleRoute } from './route/locale.route';

const routers = [
    new FolderRoute(),
    new MediaRoute(),
    new ProjectRoute(),
    new PostRoute(),
    new LocaleRoute(),
];

const app = new App([...routers]);

app.listen();