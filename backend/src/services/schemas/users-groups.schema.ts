import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users_groups' })
export class UserGroupSchema {
    @Column()
    @PrimaryColumn()
    group_id: Number;

    @Column()
    @PrimaryColumn()
    user_id: Number;

    constructor(group_id: number, user_id: number) {
        this.group_id = group_id;
        this.user_id = user_id;
    }
}
