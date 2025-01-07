import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from '../users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from '../jwt-payload.interface';
import { User } from '../user.entity';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_REFRESG_SECRET'),
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
    });
  }

  async validate(req: Request, payload: any) {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    return { ...payload, refreshToken };
  }

  // async validate(payload: JwtPayload): Promise<User> {
  //   const { username } = payload;
  //   const user: User = await this.userRepository.findOne({
  //     where: { username },
  //   });

  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  //   // return payload;
  // }
}
