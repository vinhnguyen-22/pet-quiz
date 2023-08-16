import { IAuth } from '../../services/auth.service';
import { compare, generateAccessToken, generateRefreshToken, hash } from '../../utils/bcrypt.util';
import { IUser } from '../../services/user.service';


export class AuthFlow {
    private authService: IAuth;
    private userService: IUser;
    constructor(_authService: IAuth, _userService: IUser) {
        this.authService = _authService;
        this.userService = _userService;
    }

    async login(username: string, password: string) {
        const { status, result } = await this.userService.getByName(username);
        const user = result;
        if (status == 'error') {
            return { status: 'error', result: {} };
        }

        const isMatched = await compare(password, user.password);
        if (!isMatched) {
            return { status: 'error', result: {} };
        }

        const payload = { id: user.id, username: user.username };
        const accessToken = await generateAccessToken(payload);
        const refreshToken = await generateRefreshToken(payload);
        await this.authService.updateLoginTime(user.username);
        await this.authService.setRefreshToken(refreshToken, username);
        return { status: 'success', result: { accessToken, refreshToken } };
    }

    async refreshToken(refresh_token: string) {
        const { status, result } = await this.userService.getByName(refresh_token);
        const user = result;
        const isRefreshTokenMatching = await compare(refresh_token, user.hash_refresh_token);
        if (isRefreshTokenMatching) {
            return { status: 'error', result: null };
        }

        const payload = { username: user.username };
        const accessToken = await generateAccessToken(payload);
        return { status: 'success', result: accessToken };
    }
}

export default AuthFlow;
