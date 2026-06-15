import { Module } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  providers: [FollowsService],
  exports: [FollowsService],
})
export class FollowsModule { }