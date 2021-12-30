import { Module } from '@nestjs/common';
import { DmsController } from './dms.controller';

@Module({
  controllers: [DmsController]
})
export class DmsModule {}
