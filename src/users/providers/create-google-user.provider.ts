import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { Googleuser } from '../interfaces/google-user.interface';

@Injectable()
export class CreateGoogleUserProvider {
  constructor(
    //Inject usersRepository
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async createGooleUser(googleUser: Googleuser) {
    try {
      const user = this.usersRepository.create(googleUser);
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new ConflictException(error, {
        description: 'Could not create a new user',
      });
    }
  }
}
