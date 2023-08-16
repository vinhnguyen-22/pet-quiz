import { BeforeInsert, Column, Entity, ManyToMany, JoinTable, Index, ManyToOne, OneToMany } from 'typeorm';
import { BaseSchema } from './base.schema'; 
import { GroupSchema } from './group.schema';
import { hash } from '../../utils/bcrypt.util';

@Entity({ name: 'users' })
export class UserSchema extends BaseSchema {
    @Column()
    @Index({ unique: true })
    username: string = ''; 

    @Column()
    group_ids: string = '';

    @Column({ nullable: true })
    full_name: string = '';

    @Column()
    password: string = '';

    @Column({ nullable: true })
    last_login?: Date;

    @Column({ nullable: true })
    hash_refresh_token: string = '';

    @BeforeInsert()
    async setPassword(password: string) {
        this.password = await hash(password || this.password);
    }

    @ManyToMany(() => GroupSchema, (role: GroupSchema) => role.users)
    @JoinTable({
        name: 'users_roles',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'group_id' },
    })
    groups?: GroupSchema[];
}
