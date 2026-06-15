import { Controller, Get, Req } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @Get()
  getNotifications(@Req() req: any) {
    return this.service.getUserNotifications(req.user.id);
  }
}
