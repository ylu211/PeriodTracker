import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { Strategy as JwtStrategy } from 'passport-jwt';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(JwtStrategy) {
  constructor(
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET || 'defaultKey',
    });
  }

  async validate(payload: any) {
    return this.userService.findById(payload.userId);
  }
}
