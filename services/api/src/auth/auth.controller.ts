import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { loginSchema, registerSchema, refreshTokenSchema } from '@rentwizard/core';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Neuen Benutzer registrieren' })
  @UsePipes(new ZodValidationPipe(registerSchema))
  register(@Body() body: any) {
    return this.authService.register(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Anmelden mit E-Mail und Passwort' })
  @UsePipes(new ZodValidationPipe(loginSchema))
  login(@Body() body: any) {
    return this.authService.login(body);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Access Token erneuern' })
  @UsePipes(new ZodValidationPipe(refreshTokenSchema))
  refresh(@Body() body: any) {
    return this.authService.refreshTokens(body.refreshToken);
  }
}
