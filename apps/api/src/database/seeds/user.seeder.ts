import * as argon2 from 'argon2';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { User, UserRole } from '../entities/user.entity';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    dataSource.manager;
    console.log(`-------- Start UserSeeder --------`);

    const admin = await dataSource.manager.findOneBy(User, {
      username: 'admin',
    });

    if (!admin) {
      console.log(`Creating Admin ...`);
      const admin = new User();
      admin.id = 'c3c6d381-5478-42fd-92b1-8f5256e34a11';
      admin.username = 'admin';
      admin.password = await argon2.hash('password');
      admin.role = UserRole.ADMIN;
      await dataSource.manager.save(admin);
    } else {
      console.log(`Admin is already exists`);
    }

    console.log(`-------- End UserSeeder --------\n`);
  }
}
