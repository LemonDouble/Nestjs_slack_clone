import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';

// Module로 export 하면 singleton,
// 다른 모듈에 provider (EventsGateway) 직접 추가하면 추가한 만큼 서버 생긴다
// moudle로 만들고, export 한 뒤 모듈 가져다 쓰자

@Module({
  providers: [EventsGateway],
  exports: [EventsGateway],
})
export class EventsModule {}
