import { DataSource, DataSourceOptions } from 'typeorm';
import {  SeederOptions } from 'typeorm-extension';
import yamlConfig from '../yaml-config';



export default async () => {

    const config = yamlConfig();

    let db = config.db.mysql;

        if(!/-testingdb/.test(db.database)) return;

    const dataSource = new DataSource(db as DataSourceOptions & SeederOptions);

    await dataSource.initialize();

    await dataSource.dropDatabase();

   await dataSource.destroy();
};