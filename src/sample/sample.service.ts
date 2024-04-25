import { Injectable } from '@nestjs/common';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { GenericService, ProducerService } from '@transportruae/efcommon';

@Injectable()
export class SampleService extends GenericService {
  constructor(private readonly producerService: ProducerService) {
    super();
  }

  create(createSampleDto: CreateSampleDto) {
    return 'This action adds a new sample';
  }

  async findAll() {
    await this.producerService.produce('test-topic', {
      value: JSON.stringify({ id: 1 }),
    });
    // config.kafka.topics.producers.updateuser,
    // { value: JSON.stringify({id:1}) },

    return `This action returns all sample`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sample`;
  }

  update(id: number, updateSampleDto: UpdateSampleDto) {
    return `This action updates a #${id} sample`;
  }

  remove(id: number) {
    return `This action removes a #${id} sample`;
  }
}
