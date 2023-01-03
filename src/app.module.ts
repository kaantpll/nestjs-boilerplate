import { CacheModule, CacheStore, Module, Scope } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/modules/auth.module';
import { BlogModule } from './blog/modules/blog.module';
import { ProfileModule } from './profile/modules/profile.module';
import { LoggingInterceptor } from './shared/logInterceptor';
import { UserModule } from './user/modules/user.module';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProfileModule,
    UserModule,
    BlogModule,
    AuthModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (config: ConfigService) => {
        const store = await redisStore({
          url: 'redis://redis-16200.c55.eu-central-1-1.ec2.cloud.redislabs.com:16200',
          password: 'y1abLpkKs6tmScQwVPzca4o231ZgfKfm',
        });

        return { store: store as unknown as CacheStore, ttl: 60 * 60 * 24 };
      },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
