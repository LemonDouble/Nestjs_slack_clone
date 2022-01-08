import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Connection, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { ChannelMembers } from 'src/entities/ChannelMembers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(WorkspaceMembers)
    private readonly workspaceMembersRepository: Repository<WorkspaceMembers>,
    @InjectRepository(ChannelMembers)
    private readonly channelMemberRepository: Repository<ChannelMembers>,
    private connection: Connection,
  ) {}

  async join(email: string, nickname: string, password: string) {
    console.log('join start');
    // queryRunner = 트랜잭션 하기 위함
    const queryRunner = this.connection.createQueryRunner();

    // connection 가져옴
    await queryRunner.connect();
    await queryRunner.startTransaction();

    /*
    아래처럼  this.userRepository 통해 DI 받은 Repository 사용하면, 위의 queryRunner가 만든 connection 이 아닌
    기본 Connection을 타고 간다. (즉, 다른 Connection 이용되고, Transaction도 걸리지 않는다!)
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      throw new HttpException('이미 존재하는 사용자입니다.', 400);
    }
    */

    // 따라서 다음처럼 queryRunner를 통해 Repository를 불러와야 한다.
    const user = await queryRunner.manager
      .getRepository(Users)
      .findOne({ where: { email } });
    if (user) {
      throw new HttpException('이미 존재하는 사용자입니다.', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      const savedUser = await queryRunner.manager.getRepository(Users).save({
        email,
        nickname,
        password: hashedPassword,
      });
      // 회원가입시 기본 Workspace에 자동으로 연결
      await queryRunner.manager.getRepository(WorkspaceMembers).save({
        UserId: savedUser.id,
        WorkspaceId: 1,
      });

      await queryRunner.manager.getRepository(ChannelMembers).save({
        UserId: savedUser.id,
        ChannelId: 1,
      });

      // commit 꼭 해줘야 한다!
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      console.error(error);
      // 실패시 rollback
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // 성공 실패 관계없이 connection은 풀어줘야 한다.
      await queryRunner.release();
    }
  }
}
