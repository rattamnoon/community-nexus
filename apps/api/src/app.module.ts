import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'node:path';

import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './features/auth/auth.module';
import { GqlAuthGuard } from './features/auth/guard/gql-auth.guard';
import { UsersModule } from './features/users/users.module';
import { TagsModule } from './features/tags/tags.module';
import { PostsModule } from './features/posts/posts.module';
import { CommentsModule } from './features/comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('DB_HOST'),
        port: parseInt(configService.getOrThrow('DB_PORT') || '3306'),
        username: configService.getOrThrow('DB_USER'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_DATABASE'),
        entities: [join(__dirname, './database/entities/**/*{.ts,.js}')],
        migrations: [join(__dirname, './database/migrations/**/*{.ts,.js}')],
        subscribers: [join(__dirname, './database/subscribers/**/*{.ts,.js}')],
        synchronize: false,
        timezone: 'Z',
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    TagsModule,
    PostsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
  ],
})
export class AppModule {}
