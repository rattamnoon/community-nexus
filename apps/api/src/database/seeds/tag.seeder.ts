import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { Tag } from '../entities/tag.enntity';

export default class TagSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    dataSource.manager;
    console.log(`-------- Start TagSeeder --------`);
    const tags = await dataSource.manager.find(Tag);

    const data = [
      {
        name: 'History',
      },
      {
        name: 'Food',
      },
      {
        name: 'Pets',
      },
      {
        name: 'Health',
      },
      {
        name: 'Fashion',
      },
      {
        name: 'Exercise',
      },
      {
        name: 'Others',
      },
    ];

    for (const { name } of data) {
      const tag = new Tag();

      if (!tags.find((t) => t.name === name)) {
        tag.name = name;
        await dataSource.manager.save(tag);
      }
    }

    console.log(`-------- End TagSeeder --------\n`);
  }
}
