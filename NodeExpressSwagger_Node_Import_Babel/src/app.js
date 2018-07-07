// const express = require('express');
import express from 'express';
import logger  from 'morgan';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import {router} from './config/router';
import swaggerDocument from './config/swagger.json';
const app = express();
const PORT =3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use('/api',router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,{explorer : true}));
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})