global.express = require('express');
let app = express();
let router = require('./routes/userRoute');
require('dotenv').config();
const port =4000;

// EXPRESS MIDDLE-WARE 
app.use(router);

// SERVER IS LISTENING
app.listen(`${port}`, () => {
  console.log('Listening port on:' + port);
  console.log('Connection Established Successfully');
})