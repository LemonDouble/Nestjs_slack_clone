import { ApiProperty, PickType } from '@nestjs/swagger';
import { Users } from 'src/entities/Users';

// Entity를 잘 정의했을 경우 다음과 같이 중복 제거가 가능하다.
export class JoinRequestDto extends PickType(Users, [
  'email',
  'nickname',
  'password',
]) {}
