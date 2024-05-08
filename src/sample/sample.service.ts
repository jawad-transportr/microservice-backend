import { Injectable } from '@nestjs/common';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { GenericService, ProducerService } from '@transportruae/efcommon';
import { DataSource, InsertResult } from 'typeorm';
import { Sample } from './entities/sample.entity';
import yamlConfig from 'src/config/yaml-config';

const config = yamlConfig();

@Injectable()
export class SampleService extends GenericService {
  constructor(
    private readonly producerService: ProducerService,
    private dataSource: DataSource,
  ) {
    super();
  }

  async create(createSampleDto: any) {
    const { first_name, last_name, email, password } = createSampleDto;
    // console.log('createSampleDto', createSampleDto);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    let error;
    let res: InsertResult;
    try {
      const sample = new Sample();
      sample.first_name = first_name;
      sample.last_name = last_name;
      sample.email = email;
      sample.password = password;
      res = await queryRunner.manager.insert(Sample, sample);
      await this.producerService.produce('test-service', {
        value: JSON.stringify({ createSampleDto }),
      });
      await queryRunner.commitTransaction();
    } catch (err) {
      error = err;
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
      if (error) throw error;

      return { affected: res.raw.affectedRows };
    }
  }

  async findAll() {
    await this.producerService.produce('test-service', {
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
