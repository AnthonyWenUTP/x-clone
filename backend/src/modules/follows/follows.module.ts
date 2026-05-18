import { Module } from '@nestjs/common';
import { FollowsService } from './follows.service';

@Module({
  providers: [FollowsService]
})
export class FollowsModule {}
