import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GroupSchema } from './group.schema';

@Entity({ name: 'permissions' })
export class PermSchema {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    profile_types: string = '[]';

    @Column()
    title: string = '';

    @Column()
    module: string = '';

    @Column()
    action: string = '';

    @ManyToMany(() => GroupSchema, (group) => group.permissions)
    @JoinTable({
        name: 'groups_perms',
        joinColumn: { name: 'perm_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'group_id' },
    })
    groups: GroupSchema[] | undefined;
}
