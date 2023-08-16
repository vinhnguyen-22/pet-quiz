import { UserGroupSchema } from "../services/schemas/users-groups.schema";
import { GroupSchema } from "../services/schemas/group.schema";
import { PermSchema } from "../services/schemas/perm.schema";
import { UserSchema } from "../services/schemas/user.schema";
import { ConnectionOptions } from "typeorm";

const typeOrmConfig: ConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'base_core',
    logging: false,
    entities: [UserSchema, PermSchema, GroupSchema, UserGroupSchema],
    migrations: ['dist/database/migration/**/*.ts'],
}

export default typeOrmConfig;