import * as Koa from 'koa';
import { ACCESS_TOKEN, INVALID_TOKEN } from '../../../utils/const.variable';
import ChangePasswordFlow from './change_password.flow';
import { UserService } from '../../../services/user.service';

class ChangePasswordCtrl {
    async changePassword(ctx: Koa.Context, _next: Koa.Next) {
        const access_token = ctx.cookies.get(ACCESS_TOKEN) || '';
        if (!access_token) {
            ctx.status = 400;
            ctx.body = INVALID_TOKEN;
        } else {
            const pwd = ctx.request.body;
            const flow = new ChangePasswordFlow(new UserService());
            const user = await flow.changePassword(pwd, access_token);
            if (user) {
                ctx.body = user;
            } else {
                ctx.status = 400;
                ctx.body = INVALID_TOKEN;
            }
        }
    }
}

export default new ChangePasswordCtrl();
