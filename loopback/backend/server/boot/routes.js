// Copyright IBM Corp. 2014,2019. All Rights Reserved.
// Node module: loopback-getting-started

'use strict';

console.log("routes file starting")

const bodyParser = require('body-parser');
const { Router } = require('express')
const mysql = require('mysql2')
const db = mysql.createConnection({
  user: "mysql",
  host:'mysqldb',
  database: "database_name",
  password: "root"
})

module.exports = function(app) {
  // Install a "/ping" route that returns "pong"
  app.get('/ping', function(req, res) {
    res.send('hello');
  });
  app.get('/api/PatientDiagnoses',async(req,res)=>{
    const cid = req.query.consultationId
    const sql = `SELECT MEDICINE FROM patient_diagnosis where consultation_id=${cid}`;
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing SQL query: ' + err.message);
        res.status(500).json({ error: 'Database error' });
        return;
      }
    res.json(results);})
  })

  app.get('/getsymptoms',async(req,res)=>{
    const cid = req.query.consultationId
    const sql = ` select name from symptoms,patient_symptoms where symptoms=symptom_id and consultation_id=${cid}`;
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing SQL query: ' + err.message);
        res.status(500).json({ error: 'Database error' });
        return;
      }
    res.json(results);})
  })

  app.get('/patientdetails',async(req,res)=>{
    const cid = req.query.consultationId
    const sql = `select name,age,gender,address,height,weight,Bp,temperature,diagnosis_by,consultation_by,notes,date from patient,pre_diagnosis,consultation where patient.patient_id=pre_diagnosis.patient_id and consultation.consultation_id=${cid} and pre_diagnosis.consultation_id=consultation.consultation_id ;`;
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing SQL query: ' + err.message);
        res.status(500).json({ error: 'Database error' });
        return;
      }
    res.json(results);})
  })

  app.get('/consultation',async(req,res)=>{
    const sql = `select patient.patient_id,name,consultation_id,gender,age from patient,consultation where consultation.patient_id=patient.patient_id and status='pending';`;
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing SQL query: ' + err.message);
        res.status(500).json({ error: 'Database error' });
        return;
      }
    res.json(results);})
  })

  app.get('/consultation2',async(req,res)=>{
    const sql = `select patient.patient_id,name,consultation_id,gender,address,age from patient,consultation where consultation.patient_id=patient.patient_id order by consultation_id desc;`;
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing SQL query: ' + err.message);
        res.status(500).json({ error: 'Database error' });
        return;
      }
    res.json(results);})
  })

  app.post('/consultation2',async(req,res)=>{
    const sql = `select patient.patient_id,name,consultation_id,gender,address,age from patient,consultation where consultation.patient_id=patient.patient_id order by consultation_id desc;`;
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing SQL query: ' + err.message);
        res.status(500).json({ error: 'Database error' });
        return;
      }
    res.json(results);})
  })

  app.post('/admin',bodyParser.json(),async(req,res)=>{
      const data = req.body
      if(data.password=="admin"){
        res.send({status:"Authenticated"})
        return;
      }
      else{
        res.send({status:"notAuthenticated"})
        return;
      }
  })

  app.post('/addstaff',bodyParser.json(),async(req,res)=>{
    const data = req.body
    const sql = `insert into staff (type,name,password) values('${data.type}','${data.name}','${data.password}')`;
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing SQL query: ' + err.message);
        res.status(500).json({ error: 'Database error' });
        return;
      }
    res.json(results);})
  })
  
  app.post('/checklogin',bodyParser.json(),async(req,res)=>{
    const data = req.body
    const sql = `select staff_id,type,name from staff where name='${data.name}' and password='${data.password}';  `
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing SQL query: ' + err.message);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      if (results.length==0){
        res.send({status:"does not exist"})
        return
      }
      else{
        if(results[0].type=='doctor'){
          res.send({status:"doctor",staff_id:results[0].staff_id})
          return
        }
        else if(results[0].type=="nurse"){
          res.send({status:"nurse",staff_id:results[0].staff_id})
          return
        }
        else{
          res.send({status:"error"})
          return
        }
      }
    })
  })
  
  
};
