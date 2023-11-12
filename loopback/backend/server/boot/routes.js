// Copyright IBM Corp. 2014,2019. All Rights Reserved.
// Node module: loopback-getting-started

'use strict';
const { Router } = require('express')
const mysql = require('mysql2')
const db = mysql.createConnection({
  user: "root",
  host:'mysql',
  database: "digital_health"
})



module.exports = function(app) {
  // Install a "/ping" route that returns "pong"
  app.get('/ping', function(req, res) {
    res.send('pong');
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
};
