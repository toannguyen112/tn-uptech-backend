
import { App } from './infra/express/app';
import { BannerRoute } from './route/banner.route';
import { CeoRoute } from './route/ceo.route';
import { LocaleRoute } from './route/locale.route';
import { MediaRoute } from './route/media.route';
import { PostRoute } from './route/post.route';
import { ProjectRoute } from './route/project.route';
import { FolderRoute } from './route/folder.route';
import { JobRoute } from './route/job.route';
import { RoleRoute } from './route/role.route';

const routers = [
    new FolderRoute(),
    new MediaRoute(),
    new ProjectRoute(),
    new PostRoute(),
    new CeoRoute(),
    new BannerRoute(),
    new LocaleRoute(),
    new RoleRoute(),
    new JobRoute(),
];

const app = new App([...routers]);
app.listen();

