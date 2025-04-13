import { CurrentUser } from '@/decorators/decorators';
import { Public } from '@/decorators/public.decorator';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateAuthDto } from '@repo/api/auth/dto/create-auth.dto';
import { UpdateAuthDto } from '@repo/api/auth/dto/update-auth.dto';
import { AuthService } from './auth.service';
import { GqlRefreshAuthGuard } from './guard/gql-refresh-auth.guard';
import { JwtPayload } from './interfaces/jwt-payload.interfaces';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() signupDto: CreateAuthDto) {
    return this.authService.signUp(signupDto.username, signupDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() signinDto: UpdateAuthDto) {
    return this.authService.signIn(signinDto.username, signinDto.password);
  }

  @UseGuards(GqlRefreshAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshToken(@CurrentUser() user: JwtPayload) {
    return this.authService.genTokenPackage(user.id);
  }
}
