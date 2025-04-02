import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserReqDto } from './dtos/login-user.req.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '../../config/config.service';
import { RegisterUserReqDto } from './dtos/register-user.req.dto';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly userRespository: Repository<UserEntity>
    ) { }

    async login(loginUserDto: LoginUserReqDto) {
        const { email, password } = loginUserDto;
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new UnauthorizedException();
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException();
        }
        const secret = this.configService.get<string>('JWT_SECRET_KEY');
        const payload = { email: email, sub: user.id };

        return {
            user: {
                email: user.email,
                token: this.jwtService.sign(payload, { secret }),
                username: user.username,
                bio: user.bio,
                image: user.image
            }
        };
    }

    async register(registerUserDto: RegisterUserReqDto) {
        const { email, password, username } = registerUserDto;
        const userExists = await this.usersService.findOneByEmail(email);
        if (userExists) {
            throw new UnauthorizedException();
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userRespository.create({
            email: email,
            password: password,
            username: username
        });

        await user.save();

        const secret = this.configService.get<string>('JWT_SECRET_KEY');
        const payload = { email: email, sub: user.id };

        return {
            user: {
                email: user.email,
                token: this.jwtService.sign(payload, { secret }),
                username: user.username,
                bio: user.bio,
                image: user.image
            }
        };
    }
}
