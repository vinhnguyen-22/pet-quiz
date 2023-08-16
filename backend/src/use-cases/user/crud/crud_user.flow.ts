
import { IUser } from '../../../services/user.service';
import { getUserNameByToken } from '../../../utils/bcrypt.util';

export class CrudUserFlow {
    private userService: IUser;
    constructor(_userService: IUser) {
        this.userService = _userService;
    }
    async getCurrentUser(access_token: string) {
        const username = getUserNameByToken(access_token);
        const user = await this.userService.getByName(username);
        return user;
    }

    async create(user: any) {
        return await this.userService.create(user);
    }

    async list() {
        return this.userService.list();
    }

    async delete(ids: number[]) {
        return await this.userService.deletes(ids);
    }
}

export default CrudUserFlow;
