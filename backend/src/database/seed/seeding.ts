import { createConnection } from "typeorm";
import { PermSchema } from "../../services/schemas/perm.schema";
import { GroupSchema } from "../../services/schemas/group.schema";
import { UserSchema } from "../../services/schemas/user.schema";
import { PASSWORD_DEFAULT } from "../../utils/const.variable";
import typeOrmConfig from "../../database/typeorm.config";
import { UserGroupSchema } from "../../services/schemas/users-groups.schema";

const admin = "[1]";
const staff = "[2]";

const publicApi = "[]";

async function seed() {
  try {
    console.log("seeding...");
    const connection = await createConnection(typeOrmConfig);
    await createGroup(connection);
    await createPerm(connection);
    await createUser(connection);
    await setUserToGroup(connection);
    console.log("all data inserted");
    await connection.close();
  } catch (error) {
    console.log("Error connecting to the database:", error);
  }
}

async function createPerm(connection: any) {
  const permRepo = connection.getRepository(PermSchema);
  const perms = await permRepo.find();
  const groupsPerms: any = [];
  perms.forEach((perm: any) => {
    if (perm.profile_types == admin) {
      const rolePerm = {
        group_id: 1,
        perm_id: perm.id,
      };
      groupsPerms.push(rolePerm);
    } else if (perm.profile_types == staff) {
      const rolePerm = {
        group_id: 2,
        perm_id: perm.id,
      };
      groupsPerms.push(rolePerm);
    } else if (
      perm.profile_types == "[1,2]" ||
      perm.profile_types == "[1,2]" ||
      perm.profile_types == publicApi
    ) {
      const rolePerm = {
        group_id: 1,
        perm_id: perm.id,
      };
      groupsPerms.push(rolePerm);
      const rolePerm2 = {
        group_id: 2,
        perm_id: perm.id,
      };
      groupsPerms.push(rolePerm2);
    }
  });
  const values = groupsPerms.map((groupPerm: any) => ({
    group_id: groupPerm.group_id,
    perm_id: groupPerm.perm_id,
  }));
  await connection
    .createQueryBuilder()
    .insert()
    .into("groups_perms")
    .values(values)
    .execute();
}
async function createGroup(connection: any) {
  const groups = [
    {
      id: 1,
      title: "Admin",
      profile_type: 1,
      description: "",
    },
    {
      id: 2,
      title: "Staff",
      profile_type: 2,
      description: "",
    },
  ];
  const groupRepo = connection.getRepository(GroupSchema);
  const groupList: any = [];
  groups.forEach((g) => {
    const groupCreated = groupRepo.create(g);
    groupList.push(groupCreated);
  });
  await groupRepo.save(groupList);
}

async function createUser(connection: any) {
  const passDefault = PASSWORD_DEFAULT;
  const user = {
    id: 1,
    username: "admin",
    full_name: "admin",
    group_ids: admin,
    password: passDefault,
  };

  const userRepo = connection.getRepository(UserSchema);
  const userCreated = await userRepo.create(user);
  await userRepo.save(userCreated);
}

async function setUserToGroup(connection: any) {
  const userGroup = {
    group_id: 1,
    user_id: 1,
  };

  const userGroupRepo = connection.getRepository(UserGroupSchema);
  const userGroupCreated = await userGroupRepo.create(userGroup);
  await userGroupRepo.save(userGroupCreated);
}
seed();
