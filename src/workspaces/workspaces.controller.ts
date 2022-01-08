import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorator/user.decorator';
import { Users } from 'src/entities/Users';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspacesService } from './workspaces.service';

@ApiTags('WORKSPACE')
@Controller('api/workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  /*
  @Get('/:myId')
  getMyWorkspaces(@Param('myId', ParseIntPipe) myId: number) {
    // Type은 number로 해 두었지만, 기본적으로 string 값이 들어온다.
    // parseInt(myId), 혹은 +myId(string -> number) 로 바꿔주거나
    // 위처럼 ParseIntPipe 등을 이용할 수 있다.
    return this.workspacesService.findMyWorkspaces(myId);
  }
  */

  @Get()
  async getMyWorkspaces(@User() user: Users) {
    return this.workspacesService.findMyWorkspaces(user.id);
  }

  @Post()
  async createWorkspace(@User() user: Users, @Body() body: CreateWorkspaceDto) {
    return this.workspacesService.createWorkspace(
      body.workspace,
      body.url,
      user.id,
    );
  }

  @Get(':url/members')
  async getAllMembersFromWorkspace() {}

  @Post(':url/members')
  async inviteMembersToWorkspace() {}

  @Delete(':/url/members/:id')
  async kickMemberFromWorkspace() {}

  @Get(':url/members/:id')
  async getMemberInfoInWorkspace() {}
}
