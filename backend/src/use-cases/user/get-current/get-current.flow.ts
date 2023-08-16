
import { IUser } from '../../../services/user.service';
import { getUserNameByToken } from '../../../utils/bcrypt.util';

export class GetCurrentUserFlow {
    private userService: IUser;
    constructor(_userService: IUser) {
        this.userService = _userService;
    }
    async getCurrentUser(access_token: string) {
        const username = getUserNameByToken(access_token);
        return await this.userService.getByName(username);
    }
}

export default GetCurrentUserFlow;
