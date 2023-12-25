import { PickType } from '@nestjs/swagger';
import { Profile } from '../entities/profile.entity';

export class CreateProfileDto extends PickType(Profile, [
  'avatar',
  'bio',
  'socials',
  'contact',
  'customer'
]) {
}

export class ConnectBelongsTo {
  connect: string;
}
