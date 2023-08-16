import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1691849466303 implements MigrationInterface {
    name = 'migration1691849466303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`permissions\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`profile_types\` varchar(255) NOT NULL,
                \`title\` varchar(255) NOT NULL,
                \`module\` varchar(255) NOT NULL,
                \`action\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`username\` varchar(255) NOT NULL,
                \`group_ids\` varchar(255) NOT NULL,
                \`full_name\` varchar(255) NULL,
                \`password\` varchar(255) NOT NULL,
                \`last_login\` datetime NULL,
                \`hash_refresh_token\` varchar(255) NULL,
                UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`groups\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`title\` varchar(255) NOT NULL,
                \`profile_type\` int NOT NULL,
                \`description\` varchar(255) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`users_groups\` (
                \`group_id\` int NOT NULL,
                \`user_id\` int NOT NULL,
                PRIMARY KEY (\`group_id\`, \`user_id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`users_roles\` (
                \`group_id\` int NOT NULL,
                \`user_id\` int NOT NULL,
                PRIMARY KEY (\`group_id\`, \`user_id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`groups_perms\` (
                \`perm_id\` int NOT NULL,
                \`group_id\` int NOT NULL,
                INDEX \`IDX_ee2ae1b5ee65e39b370615c154\` (\`perm_id\`),
                INDEX \`IDX_d490108b0d658782c448592805\` (\`group_id\`),
                PRIMARY KEY (\`perm_id\`, \`group_id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE INDEX \`IDX_e4435209df12bc1f001e536017\` ON \`users_roles\` (\`user_id\`)
        `);
        await queryRunner.query(`
            CREATE INDEX \`IDX_6f0a2ecb04b826a7b0132b2a64\` ON \`users_roles\` (\`group_id\`)
        `);
        await queryRunner.query(`
            CREATE INDEX \`IDX_d665a3539878a2669c5ff26966\` ON \`users_groups\` (\`group_id\`)
        `);
        await queryRunner.query(`
            CREATE INDEX \`IDX_3f4a7469c59e1c47a02a4f9ac5\` ON \`users_groups\` (\`user_id\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`groups_perms\`
            ADD CONSTRAINT \`FK_ee2ae1b5ee65e39b370615c154b\` FOREIGN KEY (\`perm_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`groups_perms\`
            ADD CONSTRAINT \`FK_d490108b0d658782c448592805b\` FOREIGN KEY (\`group_id\`) REFERENCES \`groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_roles\`
            ADD CONSTRAINT \`FK_e4435209df12bc1f001e5360174\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_roles\`
            ADD CONSTRAINT \`FK_6f0a2ecb04b826a7b0132b2a646\` FOREIGN KEY (\`group_id\`) REFERENCES \`groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_groups\`
            ADD CONSTRAINT \`FK_d665a3539878a2669c5ff26966c\` FOREIGN KEY (\`group_id\`) REFERENCES \`groups\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_groups\`
            ADD CONSTRAINT \`FK_3f4a7469c59e1c47a02a4f9ac50\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users_groups\` DROP FOREIGN KEY \`FK_3f4a7469c59e1c47a02a4f9ac50\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_groups\` DROP FOREIGN KEY \`FK_d665a3539878a2669c5ff26966c\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_6f0a2ecb04b826a7b0132b2a646\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_e4435209df12bc1f001e5360174\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`groups_perms\` DROP FOREIGN KEY \`FK_d490108b0d658782c448592805b\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`groups_perms\` DROP FOREIGN KEY \`FK_ee2ae1b5ee65e39b370615c154b\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_3f4a7469c59e1c47a02a4f9ac5\` ON \`users_groups\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_d665a3539878a2669c5ff26966\` ON \`users_groups\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_6f0a2ecb04b826a7b0132b2a64\` ON \`users_roles\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_e4435209df12bc1f001e536017\` ON \`users_roles\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_d490108b0d658782c448592805\` ON \`groups_perms\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_ee2ae1b5ee65e39b370615c154\` ON \`groups_perms\`
        `);
        await queryRunner.query(`
            DROP TABLE \`groups_perms\`
        `);
        await queryRunner.query(`
            DROP TABLE \`users_roles\`
        `);
        await queryRunner.query(`
            DROP TABLE \`users_groups\`
        `);
        await queryRunner.query(`
            DROP TABLE \`groups\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`permissions\`
        `);
    }

}
