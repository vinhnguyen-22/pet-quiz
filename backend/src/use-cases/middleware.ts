import Koa from "koa";

import { verify } from "utils/bcrypt.util";
import { getPublicApi } from "utils/ctrl.util";
import CheckPermissionFlow from "./permission/check-permission/check_permission.flow";
import { UserService } from "services/user.service";
import { PermService } from "services/perm.service";

export class AuthMiddleware {
  public static async checkAuth(
    ctx: Koa.DefaultContext,
    next: Function
  ): Promise<void> {
    try {
      const url = ctx.originalUrl.replace("/api/", "");
      const publicApis = getPublicApi();
      if (!publicApis.includes(url)) {
        let token: string = ctx.cookies.get("access_token");
        if (!token) {
          const { authorization } = ctx.headers;
          if (!authorization) {
            ctx.status = 401;
            ctx.body = "authorization";
            return;
          }
          token = authorization.split(" ")[1];
        }
        const payload = verify(token);
        if (payload) {
          ctx.state.jwt = payload;
          this.checkPerm(
            {
              user_id: payload.id,
              action: url,
            },
            ctx,
            next
          );
        } else {
          ctx.status = 404;
          ctx.body = "User does not exist.";
        }
      } else {
        await next();
      }
    } catch (e: any) {
      if (e.name === "TokenExpiredError") {
        ctx.status = 401;
        ctx.body = `Authorization token has expired on ${new Date(
          e.expiredAt
        )}.`;
      } else {
        ctx.status = 500;
        ctx.body = e;
      }
    }
  }

  public static async checkPerm(
    payload: any,
    ctx: Koa.DefaultContext,
    next: Function
  ): Promise<void> {
    const flow = new CheckPermissionFlow(new UserService(), new PermService());
    const isHasPerm = await flow.verifyPermission(payload.id, payload.action);
    if (ctx.state.jwt && isHasPerm) {
      await next();
    } else {
      ctx.status = 403;
      ctx.body = "Forbidden";
    }
  }
}
