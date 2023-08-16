import { IUser } from '../../../services/user.service';
import { compare, getUserNameByToken, hash } from '../../../utils/bcrypt.util';

export class ChangePasswordFlow {
    private userService: IUser;
    constructor(_userService: IUser) {
        this.userService = _userService;
    }

    async changePassword(pwd: any, access_token: string) {
        const username = getUserNameByToken(access_token);
        const user = await this.userService.getByName(username);
        const isMatched = await compare(pwd.passwordOld, user.password);
        if (isMatched) {
            user.password = await hash(pwd.passwordNew);
        }
        return await this.userService.update(user);
    }
}

export default ChangePasswordFlow;
