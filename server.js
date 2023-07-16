import dotenv from 'dotenv';
dotenv.config();

import express from "express";
const app = express()



const PORT = process.env.PORT || 8000;

//middlewares

import { mongoConnect } from './src/config/mongoConfig.js';
mongoConnect()

import morgan from "morgan";
import cors from 'cors';

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//main server routes
app.get("/", (req, res) =>{
    res.json({
        status: "success",
        message:"Welcome to the API"
    });
});

//other routes
app.listen(PORT, error=>{
    error? console.log(error):
    console.log(`Server is running at http://localhost:8000`);

});