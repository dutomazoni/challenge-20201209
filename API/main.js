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
let env = process.env.NODE_ENV || 'dev'

if (env === 'dev'){
    mongoDb = process.env.URL || 'mongodb+srv://teste:senhateste@cluster0.thb2w.mongodb.net/challenge_eduq?retryWrites=true&w=majority'
    port = process.env.DEV_PORT || 5001
}else{
    mongoDb = process.env.TEST_URL || 'mongodb+srv://teste:senhateste@cluster0.thb2w.mongodb.net/challenge_eduq_test?retryWrites=true&w=majority'
    port = process.env.TEST_PORT || 8080
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