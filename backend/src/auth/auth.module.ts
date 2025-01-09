import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { JwtAuthStrategy } from './jwt.strategy';

@Module({
  imports: [JwtModule.register({ secret: 'secretKey', signOptions: { expiresIn: '1h' } }), UserModule],
  providers: [AuthService, JwtAuthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
