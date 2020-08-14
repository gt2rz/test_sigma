const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const contact_validate = require('./validators/contact.validate')
const mysql_connection_params = require("./config/db.mysql.config");
const contacts = require('./controllers/contacts.controller')
var cors = require('cors')

var app = express();

// Apply middlewares
app.use(cors());
app.use(bodyparser.json());

// *** MySQL
var mysqlConnection = mysql.createConnection(mysql_connection_params);
mysqlConnection.connect((err) => {
  if (!err) {
    contacts.database(mysqlConnection);
    console.log('Connection Established Successfully');
  } else
    // console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
});

//Get json data from S3
contacts.getDataS3();

// ROUTES
app.get('/states', (req, res) => {
  res.status(200).send(contacts.statesArray)
});

app.get('/:name/cities', (req, res) => {
  res.status(200).send(contacts.cities(req.params.name))
});

app.post('/saveContacts', contact_validate, (req, res) => {
  contacts.save(req, res);
});

  
// Run server and listening on port 8090
const port = process.env.SERVER_PORT || 8090;
app.listen(port, () => console.log(`Listening on port ${port}..`));