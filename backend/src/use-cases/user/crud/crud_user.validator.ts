import { validate } from 'class-validator';
import { CrudUserPresenter } from './crud_user.presenter';

async function userValidate(data: CrudUserPresenter) {
    const errors = await validate(data);
    if (errors.length > 0) {
        return { status: 'error', result: {} };
    }
    return { status: 'success', result: data };
}

export { userValidate };
