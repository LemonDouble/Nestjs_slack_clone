import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelMembers } from 'src/entities/ChannelMembers';
import { Channels } from 'src/entities/Channels';
import { Users } from 'src/entities/Users';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { Workspaces } from 'src/entities/Workspaces';
import { Repository } from 'typeorm';
@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspaces)
    private workspacesRepository: Repository<Workspaces>,
    @InjectRepository(Channels)
    private channelsRepository: Repository<Channels>,
    @InjectRepository(WorkspaceMembers)
    private workspaceMembersRepository: Repository<WorkspaceMembers>,
    @InjectRepository(ChannelMembers)
    private channelMembersRepository: Repository<ChannelMembers>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findById(id: number) {
    // repository.findByIds([1, 2, 3]); 처럼 쓸 수 있다.
    return await this.workspacesRepository.findByIds([id]);
  }

  async findMyWorkspaces(myId: number) {
    return await this.workspacesRepository.find({
      where: {
        WorkspaceMembers: [{ UserId: myId }],
      },
    });
  }

  async createWorkspace(name: string, url: string, myId: number) {
    // crate는 Entity를 만들기만 할 뿐, 직접 저장되진 않는다!
    const workspace = this.workspacesRepository.create({
      name,
      url,
      OwnerId: myId,
    });
    // 꼭 save 호출해줘야 한다.
    const savedEntity = await this.workspacesRepository.save(workspace);

    const workspaceMember = new WorkspaceMembers();
    workspaceMember.UserId = myId;
    workspaceMember.WorkspaceId = savedEntity.id;
    await this.workspaceMembersRepository.save(workspaceMember);

    const channel = new Channels();
    channel.name = '일반';
    channel.WorkspaceId = workspaceMember.UserId;

    const savedChannel = await this.channelsRepository.save(channel);
    const channelMember = new ChannelMembers();
    channelMember.UserId = myId;
    channelMember.ChannelId = savedChannel.id;
    await this.channelMembersRepository.save(channelMember);
  }

  async getWorkspaceMembers(url: string) {
    // 'w.url = ${url}' 안 하고 별도로 객체 전달 이유? -> SQL Injection 방어?
    return await this.usersRepository
      .createQueryBuilder('u')
      .innerJoin('u.WorkspaceMembers', 'm')
      .innerJoin('m.Workspace', 'w', 'w.url = :url', { url: url })
      .getMany();
  }
}
