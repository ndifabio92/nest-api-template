import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/register')
  public create(@Body() userDto: UserDto) {
    return this.authService.create(userDto);
  }

  @Post('/login')
  public login(@Body() userDto: UserDto) {
    return this.authService.login(userDto);
  }
}
