const { Curl } = require('node-libcurl');
const curl = new Curl();
curl.setOpt('URL', 'https://sigma-studios.s3-us-west-2.amazonaws.com/test/colombia.json');
curl.setOpt('FOLLOWLOCATION', true);

module.exports = curl
