import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from 'src/shared/constants/constants';
import { UserModule } from 'src/user/modules/user.module';
import { AuthController } from '../controllers/auth.controller';
import { RoleGuard } from '../guards/role.guard';

import { JwtStrategy } from '../jwt.strategy';
import { LocalStrategy } from '../local.strategy';
import { AuthService } from '../services/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],

  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,

  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
