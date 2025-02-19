import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async findOneByEmail(email: string): Promise<UserEntity | undefined> {
        return (await this.userRepository.findOne({ where: { email } })) ?? undefined;
    }
}
