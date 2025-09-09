import { Controller, Post, Body, UseGuards, Request, Get, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { AuthCredentialsDto } from '../common/dto/auth-credentials.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() authCredentialsDto: AuthCredentialsDto) {
    try {
      return await this.userService.register(authCredentialsDto.email, authCredentialsDto.password);
    } catch (error) {
      throw new BadRequestException('User registration failed');
    }
  }

  @Post('login')
  async login(@Body() authCredentialsDto: AuthCredentialsDto) {
    const user = await this.userService.validateUser(authCredentialsDto.email, authCredentialsDto.password);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
