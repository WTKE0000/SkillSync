import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize';
import dbConnection from './dbConfig/dbConnection.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8800;

// Connection to mongo DB
dbConnection();

// now we apply some middleware

app.use(cors());
app.use(xss());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(mongoSanitize());
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({extended: true}));

app.use(morgan("dev"));

app.listen(PORT, ()=>{
    console.log(`Deve Server running on port: ${PORT}` );
});
