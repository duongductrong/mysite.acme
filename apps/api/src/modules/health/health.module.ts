import { Module } from '@nestjs/common';
import { HealthController } from './heath.controller';

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
