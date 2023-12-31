// Copyright IBM Corp. 2014,2019. All Rights Reserved.
// Node module: loopback-getting-started

'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');

const app = module.exports = loopback();

console.log("server file starting")
app.start = function() {
  // start the web server
  console.log('app.start in server file')
  return app.listen(function() {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  console.log("boot function called in server file")
  if (err) throw err;

  console.log("boot function called - no error - in server file")

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
