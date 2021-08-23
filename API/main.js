import express from 'express';
import mongoose from 'mongoose';
import routes from './Routes/index';
import cors from 'cors'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from "path";

dotenv.config({ path: path.join(__dirname, '.env') });
let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(routes);
let port

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

let mongoDb
if (process.env.NODE_ENV === 'dev'){
    mongoDb = process.env.URL
    port = process.env.DEV_PORT
}else{
    mongoDb = process.env.TEST_URL
    port = process.env.TEST_PORT
}

mongoose.connect(mongoDb, { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false});
let db = mongoose.connection
db.on('error', (error) => {
    console.log(error);
    console.error.bind(console, 'connection error:');
});
db.on('connected', () => {
    console.log('Connected to the database.');
});

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});

export {app};