import { Min } from 'class-validator';
export class AuthPresenter {
    @Min(1)
    username: string = '';
    @Min(6)
    password: string = '';
}
