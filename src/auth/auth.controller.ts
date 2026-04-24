import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ManagerGuard } from './guards/auth.manager.guard';
import { AuthGuard } from './guards/auth.guard';

type SignInReq = {
    username: string,
    password: string,
}

type SignUpReq = {
    username: string,
    password: string,
    role: string
}


@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Post('signup')
    async Signup(@Body() data: SignUpReq){
        return this.authService.signUp(data.username,data.password,data.role)
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() data: SignInReq){
        return this.authService.signIn(data.username,data.password)
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req){
        return req.user;
    }
}
