import { getRepository } from 'typeorm';
import { UserSchema } from './schemas/user.schema'; 

export interface IUser {
    list(): Promise<any>;
    getByName(username: string): Promise<any>;
    deletes(ids: number[]): Promise<any>;
    update(user: UserSchema): Promise<any>;
    create(user: UserSchema): Promise<any>;
    findOne(id: number): Promise<any>;
}

export class UserService implements IUser {
    async findOne(id: number): Promise<any> {
        const userRepo = getRepository(UserSchema);
        const user = await userRepo.findOne(id);
        return { status: 'success', result: user };
    }
    async getByName(username: string) {
        const userRepo = getRepository(UserSchema);
        const user = (await userRepo.findOne({
            where: { username: username },
        })) as UserSchema;
        return { status: 'success', result: user };
    }

    async deletes(ids: number[]): Promise<any> {
        const userRepo = getRepository(UserSchema);
        await userRepo.delete(ids);
        return { status: 'success', result: ids };
    }

    async list(): Promise<any> {
        const userRepo = getRepository(UserSchema);
        let query = userRepo.createQueryBuilder('user');
        return { status: 'success', result: query };
    }

    async create(user: UserSchema): Promise<any> {
        let userUpdated: any = null;
        const userRepo = getRepository(UserSchema);
        const userStore = await userRepo.findOne({
            username: user.username,
        });
        if (userStore) {
            return { status: 'error', result: userStore };
        }
        const userCreated = await userRepo.create(user);
        userUpdated = await userRepo.save(userCreated);
        return { status: 'success', result: userUpdated };
    }

    async update(user: UserSchema): Promise<any> {
        const userRepo = getRepository(UserSchema);
        await userRepo.save(user);
        return { status: 'success', result: user };
    }
}
