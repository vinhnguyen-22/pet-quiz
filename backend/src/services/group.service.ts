import { GroupSchema } from './schemas/group.schema';
import { getRepository } from 'typeorm';

export interface IGroup {
    getAll(): Promise<GroupSchema[]>;
}
export class GroupService implements IGroup {
    async getAll(): Promise<any> {
        const groupRepo = getRepository(GroupSchema);
        const groups = await groupRepo.find();
        return { status: 'success', result: groups };
    }
}
