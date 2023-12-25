import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { StoreNoticesController } from './store-notices.controller';
import { StoreNoticesService } from './store-notices.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/entities/user.schema';
import { Profile } from 'src/users/entities/profile.entity';
import { ProfileSchema } from 'src/users/entities/profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }, { name: Profile.name, schema: ProfileSchema }])
  ],
  controllers: [StoreNoticesController],
  providers: [StoreNoticesService, UsersService],
})
export class StoreNoticesModule {}
