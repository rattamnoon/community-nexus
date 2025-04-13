import {
  EntitySubscriberInterface,
  EventSubscriber,
  RemoveEvent,
} from 'typeorm';
import { UserAudit } from '../entities/user-audit.entity';
import { User } from '../entities/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async beforeRemove(event: RemoveEvent<User>): Promise<any> {
    const user = await event.manager
      .getRepository(User)
      .findOneBy({ id: event.entity.id });

    const audit = event.manager.create(UserAudit, user);

    const savedAudit = await event.manager.save(audit);

    await event.manager.softDelete(UserAudit, savedAudit.id);
  }
}
