import { getRepository } from "typeorm";
import { UserSchema } from "./schemas/user.schema";
import { PermSchema } from "./schemas/perm.schema";

export interface IPerm {
  list(): Promise<any>;
  deletes(ids: number[]): Promise<any>;
  update(user: UserSchema): Promise<any>;
  create(user: UserSchema): Promise<any>;
  findOne(id: number): Promise<any>;
  getByAction(action: string): Promise<any>;
}

export class PermService implements IPerm {
  async getByAction(action: string): Promise<any> {
    const permRepo = getRepository(PermSchema);
    const perm = (await permRepo.findOne({
      where: { action: action },
    })) as PermSchema;
    return { status: "success", result: perm };
  }

  async findOne(id: number): Promise<any> {
    const userRepo = getRepository(UserSchema);
    const user = await userRepo.findOne(id);
    return { status: "success", result: user };
  }

  async deletes(ids: number[]): Promise<any> {
    const userRepo = getRepository(UserSchema);
    await userRepo.delete(ids);
    return { status: "success", result: ids };
  }

  async list(): Promise<any> {
    const userRepo = getRepository(UserSchema);
    let query = userRepo.createQueryBuilder("user");
    return { status: "success", result: query };
  }

  async create(user: UserSchema): Promise<any> {
    let userUpdated: any = null;
    const userRepo = getRepository(UserSchema);
    const userStore = await userRepo.findOne({
      username: user.username,
    });
    if (userStore) {
      return { status: "error", result: userStore };
    }
    const userCreated = await userRepo.create(user);
    userUpdated = await userRepo.save(userCreated);
    return { status: "success", result: userUpdated };
  }

  async update(user: UserSchema): Promise<any> {
    const userRepo = getRepository(UserSchema);
    await userRepo.save(user);
    return { status: "success", result: user };
  }
}
