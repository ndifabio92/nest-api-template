import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(

    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    private readonly _jwtService: JwtService,
  ) { }

  public async create(user: UserDto) {

    const { password, ...userData } = user;

    const newUser = this._userRepository.create({
      ...userData,
      password: bcrypt.hashSync(password, 10)
    });
    await this._userRepository.save(newUser);
    delete newUser.password;

    return {
      ...newUser,
      token: this.getJwtToken({ email: newUser.email })
    };
  }

  public async login(user: UserDto) {
    const { password, email } = user;

    const getUser = await this._userRepository.findOne({
      where: { email },
      select: { email: true, password: true, roles: true }
    });

    if (!getUser) throw new UnauthorizedException();

    if (!bcrypt.compareSync(password, getUser.password)) throw new UnauthorizedException()
    delete getUser.password;
    return {
      ...getUser,
      token: this.getJwtToken({ email: getUser.email })
    };
  }

  private getJwtToken(payload: JwtPayload) {
    return this._jwtService.sign(payload);
  }

}
