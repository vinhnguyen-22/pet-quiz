import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PermSchema } from './perm.schema';
import { UserSchema } from './user.schema';

@Entity({ name: 'groups' })
export class GroupSchema {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    title: string = '';

    @Column()
    profile_type: number = 0;

    @Column({ nullable: true })
    description: string = '';

    @ManyToMany(() => UserSchema, (users) => users.groups)
    @JoinTable({
        name: 'users_groups',
        joinColumn: { name: 'group_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id' },
    })
    users: UserSchema[] | undefined;

    @ManyToMany(() => PermSchema, (perm) => perm.groups, {
        eager: true,
    })
    @JoinTable({
        name: 'groups_perms',
        joinColumn: { name: 'group_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'perm_id' },
    })
    permissions: PermSchema[] | undefined;
}
