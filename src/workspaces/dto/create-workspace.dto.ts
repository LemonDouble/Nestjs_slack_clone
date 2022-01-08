import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  public workspace: string;

  @IsString()
  @IsNotEmpty()
  public url: string;
}
