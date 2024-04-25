import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService, rolesEnum } from '@transportruae/efcommon';
import yamlConfig from '../config/yaml-config';
import { nanoid } from 'nanoid';

@Injectable()
export class SampleConsumer implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService) {}

  async onModuleInit() {
    this.consumerService.consume({
      topic: { topics: ['test-topic'] },
      config: { groupId: 'sample-' + nanoid() },
      onMessage: async (message) => {
        console.log(message.value.toString());
      },
    });
  }
}
