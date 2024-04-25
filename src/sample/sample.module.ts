import { Module } from '@nestjs/common';
import { SampleService } from './sample.service';
import { SampleController } from './sample.controller';
import { SampleConsumer } from './sample.consumer';

@Module({
  controllers: [SampleController],
  providers: [SampleService, SampleConsumer],
})
export class SampleModule {}
