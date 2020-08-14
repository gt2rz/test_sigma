# Test Sigma
Realtime Chat Application. Make to ReactJs, NodeJs, SockeIO and MySQL

## Server Installation 
••••••••
To install the dependencies of each folder run:

```bash
npm install
```
Open the App / config folder and modify the db.config.js file, according to the parameters of your database. Note: this application has only been tested with MySQL.

Run the server. This by default will run on port 8080
```bash
nodemon server.js
```

## Client Installation

To install the dependencies of each folder run:

```bash
npm install
```

Run the client. This by default will run on port 8080
```bash
npm run dev
```

Run in production the client.
```bash
npm run build
```
This will generate a dist folder that will contain a bundle with everything you need to run the application. Can be copied and pasted into an apache or nginx directory
