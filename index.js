const express = require('express')
const bodyParser = require('body-parser');
//require("dotenv").config({ path: ".env" });
const routes = require('./routes');
const app = express()
const port = 4002

//habilitar json con body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use('/', routes);

app.listen(port, () => {
  console.log(`El servidor esta corriendo...  http://localhost:${port}`)
})