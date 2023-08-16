import * as Koa from 'koa';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AuthPresenter } from './auth.presenter';
import { AuthFlow } from './auth.flow';
import { authValidate } from './auth.validator';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../utils/const.variable';

export class AuthCtrl {
    async login(ctx: Koa.Context, _next: Koa.Next) {
        const { username, password } = ctx.request.body as AuthPresenter;
        const validation = await authValidate({ username, password });
        if (validation.status == 'error') {
            ctx.status = 400;
            ctx.body = 'bad request!';
        }
        const flow = new AuthFlow(new AuthService(), new UserService());
        const { status, result } = await flow.login(username, password);
        if (status == 'error') {
            ctx.status = 400;
            ctx.body = 'bad request!';
        } else {
            const { accessToken, refreshToken } = result;
            ctx.cookies.set(ACCESS_TOKEN, accessToken, { httpOnly: true });
            ctx.cookies.set(REFRESH_TOKEN, refreshToken, { httpOnly: true });
            ctx.body = 'success!';
        }
    }

    async refreshToken(ctx: Koa.Context, _next: Koa.Next) {
        const refresh_token = ctx.cookies.get(REFRESH_TOKEN) || '';
        if (!refresh_token) {
            ctx.status = 400;
            ctx.body = 'bad request!';
        }
        const flow = new AuthFlow(new AuthService(), new UserService());
        const { status, result } = await flow.refreshToken(refresh_token);
        if (status === 'error') {
            ctx.status = 400;
            ctx.body = 'bad request!';
        }
        ctx.cookies.set(ACCESS_TOKEN, result, {
            httpOnly: true,
        });
        ctx.body = 'success!';
    }

    async logout(ctx: Koa.Context, _next: Koa.Next) {
        ctx.cookies.set(ACCESS_TOKEN, null, {
            httpOnly: true,
        });
        ctx.body = 'success!';
    }
}

export default new AuthCtrl();
