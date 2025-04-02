import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserWrapperReqDto } from './dtos/login-user.req.dto';
import { RegisterUserWrapperReqDto } from './dtos/register-user.req.dto';

@Controller('api/users')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginWrapperDto: LoginUserWrapperReqDto) {
        return this.authService.login(loginWrapperDto.user);
    }

    @Post('')
    async register(@Body() registerWrapperDto: RegisterUserWrapperReqDto) {
        return this.authService.register(registerWrapperDto.user);
    }
}
