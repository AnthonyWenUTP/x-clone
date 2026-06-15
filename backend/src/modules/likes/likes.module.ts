import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  providers: [LikesService],
  exports: [LikesService],
})
export class LikesModule {}
