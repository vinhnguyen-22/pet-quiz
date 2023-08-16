import * as Koa from 'koa';
import GetAllFlow from './role.flow';
import { GroupService } from '../../services/group.service';

class RoleCtrl {
    async list(ctx: Koa.Context, _next: Koa.Next) {
        const flow = new GetAllFlow(new GroupService());
        const result = await flow.getAll();
        ctx.body = result;
    }
}

export default new RoleCtrl();
