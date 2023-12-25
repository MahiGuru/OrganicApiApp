import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TagSchema } from './entities/tag.schema';
import { Tag } from './entities/tag.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }])
  ],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
