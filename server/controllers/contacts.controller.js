const curl = require("../config/curl.config");
const { validationResult } = require('express-validator');
const contact_validate = require('../validators/contact.validate')

var statesArray = []
var regionesColombia = {}
var database;

module.exports.getDataS3 = function () {

  // The data is obtained during the end event of curl 
  curl.on('end', function (statusCode, data, { }) {
    if (statusCode === 200) {
      regionesColombia = JSON.parse(data)
      for (datos in regionesColombia) {
        statesArray.push(datos);
      }
    }
    this.close();
  });

  // In case of error the connection is closed
  curl.on('error', curl.close.bind(curl));

  // Run query from S3
  curl.perform();
}

module.exports.statesArray = statesArray

module.exports.cities = function (state_name) {
  return regionesColombia[state_name];
}

module.exports.database = function (db) {
  database = db;
}

module.exports.save = function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let contact = req.body;
  database.query("insert into contacts (name, email, state, city) values('" + contact.name + "','" + contact.email + "','" + contact.state + "','" + contact.city + "')", (err, rows, fields) => {
    if (!err)
      res.status(200).json({ data: { id: rows.insertId } })
    else{}
      res.status(500).json({ data: { error: err.message } })
  })
}
