 
import { get_routes, post_routes, delete_routes } from '../../route';
import { createConnection } from 'typeorm';
import typeOrmConfig from '../../database/typeorm.config';
import { PermSchema } from '../../services/schemas/perm.schema';

async function seed() {
    try {
        const connection = await createConnection(typeOrmConfig);
        const routers = [...get_routes, ...post_routes, ...delete_routes];
        const permRepo = connection.getRepository(PermSchema);
        const permissions: any = [];
        const permList = await permRepo.find();
        if (permList.length < routers.length) {
            routers.forEach((route: any) => {
                const module = route.path.indexOf('auth') > -1 ? '' : route.path;
                const path = route.path.replace('/api/', '');
                const action = route.ctrl.name;
                const perm = {
                    title: action + ' ' + module.replace('/', ''),
                    module: path.replace('/', ''),
                    action: action,
                    profile_types: route.name,
                };
                const permCreated = permRepo.create(perm);
                permissions.push(permCreated);
            });
            await permRepo.save(permissions);
        }
        console.log('sync all perm');
        await connection.close();
    } catch (error) {
        console.log('Error connecting to the database:', error);
    }
}

seed();
