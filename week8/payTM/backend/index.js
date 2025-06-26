import express from "express";
import cors from 'cors'
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken'

app.use(cors())

app.use(express.json());

const mainRouter = require('./routes/index');

const app = express();

app.use('/api/v1', mainRouter)



app.listen(3000)