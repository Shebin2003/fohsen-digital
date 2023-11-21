// var server = require('./server');
// var ds = server.dataSources.fohsenmysql;

// // Schema naming : 'Experiment', 'ExperimentPlate', 'ManualScore', 
// //Add all your tables in lbtables including the following tables
// var lbTables = ['AccessToken', 'ACL', 'RoleMapping', 'Role','User'];
// console.log("creating lb tables")
// ds.automigrate(lbTables, function(er) {
//   if (er) throw er;
//   console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
//   ds.disconnect();  
// });