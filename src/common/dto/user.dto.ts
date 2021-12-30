import { ApiProperty } from '@nestjs/swagger';
import { JoinRequestDto } from 'src/users/dto/join.request.dto';

// JoinRequestDto 에 email, 닉네임, pw 있으므로 extens해서 중복을 제거할 수 있다.
export class UserDto extends JoinRequestDto {
  @ApiProperty({
    required: true,
    example: 1,
    description: '아이디',
  })
  id: number;
}
