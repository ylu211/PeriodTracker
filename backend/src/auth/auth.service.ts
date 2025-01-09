import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }

    const payload = { userId: user._id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
