import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as jwt from 'jsonwebtoken';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    async register(
        @Body() RegisterUserDto: RegisterUserDto
    ) {
        const { email, password, name } = RegisterUserDto;

        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
            throw new HttpException('This email already exists', HttpStatus.BAD_REQUEST);
        }
        return this.userService.createUser(email, password, name);
    }

    @Post('login')
    async login(
        @Body() LoginUserDto: LoginUserDto
    ) {
        const { email, password } = LoginUserDto;
        
        const checkLogin = await this.userService.checkPwd(email, password);
        if (!checkLogin) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        if (!process.env.JWT_SECRET) {
            throw new HttpException('JWT_SECRET is not defined in environment variables', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const token = jwt.sign(
            { email }, 
            process.env.JWT_SECRET as string, 
        );
    
        return { 
            message: 'Login successful!',
            token,
        };
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
      return this.userService.findById(id);
    }
    @Get('/mail/:email')
    async getUserByEmail(@Param('email') email: string) {
      return this.userService.findByEmail(email);
    }
}