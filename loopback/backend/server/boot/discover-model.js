'use strict';

const camelCase = require('camelcase');
const decamelize = require('decamelize');

const loopback = require('loopback');
const promisify = require('util').promisify;
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const mkdirp = require('mkdirp');
var server = require('../server');
var ds = server.dataSources.fohsenmysql;

const DATASOURCE_NAME = 'fohsenmysql';
// 'Experiment', 'ExperimentPlate', 'ManualScore'
//const name = 'Symptoms'
// const dbname  = 'chemgendb'
const dbname  = 'database_name'


const mysql = require('mysql2/promise');

async function foo(){
  console.log("foo running")
  const connection = await mysql.createConnection({
    user: "mysql",
    host:'mysqldb',
    database: "database_name",
    password: "root"
  })

  let patient = "create table if not exists patient(patient_id int primary key auto_increment not null,name varchar(50),age date,gender enum('m','f'),address varchar(100));";
  const [rows1, fields1] = await connection.execute(patient);
  console.log("patient Table created");

  let staff = "create table if not exists staff(staff_id int primary key auto_increment not null,type enum('doctor','nurse'),name varchar(50),password varchar(35));";
  const [rows2, fields2] = await connection.execute(staff);
  console.log("Staff Table created");

  let consultation = "create table if not exists consultation(consultation_id int primary key auto_increment not null,patient_id int ,date date,consultation_by int ,notes varchar(50),status varchar(10),foreign key(patient_id) references patient(patient_id),foreign key(consultation_by) references staff(staff_id));";
  const [rows3, fields3] = await connection.execute(consultation);
  console.log("consultation Table created");

  let symptoms = "create table if not exists symptoms(symptom_id int primary key auto_increment not null,name varchar(50),description varchar(50));";
  const [rows4, fields4] = await connection.execute(symptoms);
  console.log("symptoms Table created");

  let pre_diagnosis = "create table if not exists pre_diagnosis(pd_id int primary key auto_increment not null,consultation_id int,patient_id int,height int,weight int,Bp int,temperature int,diagnosis_by int,foreign key(consultation_id) references consultation(consultation_id),foreign key(patient_id) references patient(patient_id),foreign key(diagnosis_by) references staff(staff_id));";
  const [rows5, fields5] = await connection.execute(pre_diagnosis);
  console.log("pre_diagnosis Table created");

  let patient_symptoms = "create table if not exists patient_symptoms(ps_id int primary key auto_increment,consultation_id int,notes varchar(50),symptoms int,foreign key(consultation_id) references consultation(consultation_id),foreign key(symptoms) references symptoms(symptom_id));";
  const [rows6, fields6] = await connection.execute(patient_symptoms);
  console.log("patient_symptoms Table created");

  let patient_diagnosis = "create table if not exists patient_diagnosis(diagnosis_id int primary key auto_increment not null,medicine varchar(50),consultation_id int,foreign key(consultation_id) references consultation(consultation_id));";
  const [rows7, fields7] = await connection.execute(patient_diagnosis);
  console.log("patient_diagnosis Table created");

  const names = [{name:'Consultation',modelname:'consultation'},
  {name:'Patient',modelname:'patient'}, 
  {name:'PatientDiagnoses',modelname:'patient_diagnoses'},
  {name:'PatientSymptoms',modelname:'patient_symptoms'},
  {name:'PreDiagnoses',modelname:'pre_diagnoses'},
  {name:'Staff',modelname:'staff'},
  {name:'Symptoms',modelname:'symptoms'}
 ]
  
 
//  for(let i=0;i<names.length;i++){
//     const path = '../../common/models/'+names[i].modelname+'.json'
//     console.log('path : ',path)
//     if (fs.existsSync(path)) {
//       console.log('File found',names[i].name)
//     } else {
//       discover(names[i].modelname)
//       console.log('Discover function called for ',names[i].name);
//    }
//   }

  var lbTables = ['AccessToken', 'ACL', 'RoleMapping', 'Role','User'];
  console.log("creating lb tables")
  ds.automigrate(lbTables, function(er) {
    if (er) throw er;
    console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
    ds.disconnect();  
  });
}

foo()

async function discover(name) {
  const tableDecamelize = decamelize(name)
  const TABLE_NAME = tableDecamelize;
    console.log('discover-1',TABLE_NAME)
    // It's important to pass the same "options" object to all calls
    // of dataSource.discoverSchemas(), it allows the method to cache
    // discovered related models
    const options = { relations: true };
    console.log('discover-2',TABLE_NAME)
    const dataSourceConfig = require('../datasources.json');
    const db = new loopback.DataSource(dataSourceConfig[DATASOURCE_NAME]);
    // Discover models and relations
    console.log('discover-3',TABLE_NAME)
    const model = await db.discoverSchemas(TABLE_NAME, options);
    console.log('discover-4')
    console.log("model : ",model)
    // Create model definition files
    // await mkdirp('common/models/'+TABLE_NAME+'/def');
    await writeFile(
        '../../common/models/' + TABLE_NAME + '.json',
        JSON.stringify(model[dbname + '.' + TABLE_NAME], null, 2)
    );

    // Expose models via REST API
    const configJson = await readFile('../model-config.json', 'utf-8');
    console.log('MODEL CONFIG', configJson);
    const config = JSON.parse(configJson);

    config[name] = { dataSource: DATASOURCE_NAME, public: true };
    console.log("discover-5")
    await writeFile(
        '../model-config.json',
        JSON.stringify(config, null, 2)
    );
    console.log(name,'discover complete')
}
