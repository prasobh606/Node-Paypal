var express = require('express');


var paypal = require('paypal-rest-sdk');
var config = {};
var router = express.Router();





/*
 * SDK configuration
 */
 

router.init = function(c){

  config = c;
  paypal.configure(c.api);
  //console.log("paypal",paypal);
}



module.exports = router;
