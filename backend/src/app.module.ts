import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: envValidationSchema,
    }),
    AuthModule,
    UsersModule,
    DatabaseModule,
    FollowsModule,
    PostsModule,
    FeedModule,
    LikesModule,
    SearchModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}