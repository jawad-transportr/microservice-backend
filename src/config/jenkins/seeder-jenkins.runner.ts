import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { getDataSourceOptions } from '../databases/mysql.datasource';
import yamlConfig from '../yaml-config';

import {createDatabase} from "typeorm-extension";



export default async () => {

    const config = yamlConfig();

    let db = config.db.mysql;

    if(!/-testingdb/.test(db.database)) return;

     await createDatabase({ifNotExist: true,options: {  type: db.type,
     host: db.host,
     port: db.port,
     username: db.username,
     password: db.password,
     database: db.database}});

    const dataSource = new DataSource(db as DataSourceOptions & SeederOptions);

    await dataSource.initialize();

    // const rolesRepository =  dataSource.getRepository(Role);
    // let roles = config.seeders.roles
    // await rolesRepository.createQueryBuilder()
    // .insert()
    // .values(roles)
    // .orIgnore()
    // .execute();


    // const countryRepository =  dataSource.getRepository(Country);
    // const countries = config.seeders.countries;
    // await countryRepository.createQueryBuilder()
    // .insert()
    // .values(countries)
    // .orIgnore()
    // .execute();


    await dataSource.destroy();

};