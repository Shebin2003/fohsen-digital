'use strict';

const camelCase = require('camelcase');
const decamelize = require('decamelize');

const loopback = require('loopback');
const promisify = require('util').promisify;
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const mkdirp = require('mkdirp');


const DATASOURCE_NAME = 'fohsenmysql';
// 'Experiment', 'ExperimentPlate', 'ManualScore'
const name = 'Symptoms'
// const dbname  = 'chemgendb'
const dbname  = 'digital_health'
const tableDecamelize = decamelize(name)
const TABLE_NAME = tableDecamelize;
// const TABLE_NAME = name;
// const dataSourceConfig = require('../server/datasources.production.json');
const dataSourceConfig = require('../server/datasources.json');
const db = new loopback.DataSource(dataSourceConfig[DATASOURCE_NAME]);


discover().then(
    success => process.exit(),
    error => { console.error('UNHANDLED ERROR:\n', error); process.exit(1); }
);

async function discover() {
    // It's important to pass the same "options" object to all calls
    // of dataSource.discoverSchemas(), it allows the method to cache
    // discovered related models
    const options = { relations: true };

    // Discover models and relations
    const model = await db.discoverSchemas(TABLE_NAME, options);
    console.log(model)
    // Create model definition files
    // await mkdirp('common/models/'+TABLE_NAME+'/def');
    await writeFile(
        '../common/models/' + TABLE_NAME + '.json',
        JSON.stringify(model[dbname + '.' + TABLE_NAME], null, 2)
    );

    // Expose models via REST API
    const configJson = await readFile('../server/model-config.json', 'utf-8');
    console.log('MODEL CONFIG', configJson);
    const config = JSON.parse(configJson);

    config[name] = { dataSource: DATASOURCE_NAME, public: true };

    await writeFile(
        '../server/model-config.json',
        JSON.stringify(config, null, 2)
    );
}
