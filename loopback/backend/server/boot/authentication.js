// Copyright IBM Corp. 2014,2019. All Rights Reserved.
// Node module: loopback-getting-started

'use strict';
console.log("atuthentication file called")
module.exports = function enableAuthentication(server) {
  // enable authentication
  server.enableAuth();
};
