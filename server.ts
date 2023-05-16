import { App } from './src/infra/express/app';
import { BannerRoute } from './src/route/banner.route';
import { CeoRoute } from './src/route/ceo.route';
import { LocaleRoute } from './src/route/locale.route';
import { MediaRoute } from './src/route/media.route';
import { PostRoute } from './src/route/post.route';
import { ProjectRoute } from './src/route/project.route';
import { FolderRoute } from './src/route/folder.route';
import { JobRoute } from './src/route/job.route';
import { RoleRoute } from './src/route/role.route';
import { CategoryRoute } from './src/route/categories.route';
import { AdminRoute } from './src/route/admin.route';
import { PermissionRoute } from './src/route/permission.route';
import { BranchRoute } from './src/route/branch.route';
import { ServiceRoute } from './src/route/service.route';
import { ContactRoute } from './src/route/contact.route ';
import { CommontRoute } from './src/route/common.route';

const routers = [
    new CommontRoute(),
    new AdminRoute(),
    new ServiceRoute(),
    new BranchRoute(),
    new PermissionRoute(),
    new FolderRoute(),
    new MediaRoute(),
    new ProjectRoute(),
    new CategoryRoute(),
    new PostRoute(),
    new CeoRoute(),
    new BannerRoute(),
    new LocaleRoute(),
    new RoleRoute(),
    new JobRoute(),
    new ContactRoute(),
];

const app = new App([...routers]);
app.listen();

