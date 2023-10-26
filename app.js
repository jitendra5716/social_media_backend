const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
const cookieParser = require('cookie-parser');
const mongodb = require('./config/mongoose');
const cors = require('cors');
const cookie = require('cookie');

const app = express();

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));






app.use('/',require('./routes/index'));

app.listen(port,()=>{
    console.log("Express Server is running on port ",port);
})