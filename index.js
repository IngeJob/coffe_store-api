const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload')
const router = require('./src/routes/index.router')
require('dotenv').config();

//Initializations
const app = express();
require('./src/database');
require('./src/websocket');

//Settings
app.set('port', process.env.PORT || 5000);

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(cors({
    origin: '*'
}))

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : './src/public/img/avatar'
}));

//Routes
app.use('/', router);

//Server is listening
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port')) 
})