import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {
    super();
  }

  serializeUser(user: Users, done: Function) {
    console.log(`serializeUser : ${user.id}`);
    done(null, user.id);
  }

  // +userId : string -> number
  async deserializeUser(userId: string, done: Function) {
    return await this.usersRepository
      .findOneOrFail(
        {
          id: +userId,
        },
        {
          select: ['id', 'email', 'nickname'],
          relations: ['Workspaces'],
        },
      )
      .then((user) => {
        console.log('deserializeUser : ', user); //req.user
        done(null, user);
      })
      .catch((error) => done(error));
  }
}
