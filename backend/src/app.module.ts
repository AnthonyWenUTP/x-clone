import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import appConfig from './config/app.config';
import { envValidationSchema } from './config/env.validation';

import { PrismaService } from './database/prisma.service';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { FollowsModule } from './modules/follows/follows.module';
import { PostsModule } from './modules/posts/posts.module';
import { FeedModule } from './modules/feed/feed.module';
import { LikesModule } from './modules/likes/likes.module';
import { SearchModule } from './modules/search/search.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { RealtimeModule } from './modules/realtime/realtime.module';

import { HealthModule } from './common/health/health.module';
import { HealthController } from './common/health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: envValidationSchema,
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 60, // seconds (NOT ms)
        limit: 100,
      },
    ]),

    AuthModule,
    UsersModule,
    DatabaseModule,
    FollowsModule,
    PostsModule,
    FeedModule,
    LikesModule,
    SearchModule,
    NotificationsModule,
    RealtimeModule,
    HealthModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
  controllers: [HealthController],
})
export class AppModule {}
