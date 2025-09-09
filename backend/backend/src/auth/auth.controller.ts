import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from '../common/dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('refresh')
  async refresh(@Body() dto: RefreshTokenDto) {
    try {
      return this.authService.refreshToken(dto.refresh_token);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
