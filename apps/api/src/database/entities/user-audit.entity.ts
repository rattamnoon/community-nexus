import { Column, Entity } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class UserAudit extends UserEntity {
  @Column()
  username: string;
}
