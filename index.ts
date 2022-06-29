require('dotenv').config();
import express, { Application, Request, Response } from 'express';
import { EnviromentSetup } from './src/configuration/env';
import { DB } from './src/model/mysql';
import * as bodyParser from 'body-parser';
import { UserRouter } from './src/router/user';
const configuration = new EnviromentSetup(process.env.ENVIROMENT).enviroment;
const app: Application = express();
const port = configuration.portNo;

// Body parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Metheds', 'GET,POST,PUT,PATCH,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})
app.use('/api/user', UserRouter);

DB.sequelize.sync({force: true})
.then(() => {
  console.log('done creating db') 
  DB.roleModel.create({
    id: 1,
    name: DB.Roles[0].toString()
  }).then(()=>console.log('done'))
  .catch((err) =>{
    console.log(err);
    console.log(err.message);
  });
  DB.roleModel.create({
    id: 2,
    name: DB.Roles[1].toString()
  });
})
.catch((err) => console.log(err) );

app.get('/',()=>{
  console.log('Our API is up and runnig');
});

try{
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  });
}catch(err){
  console.log(`Error occurred: ${err.message}`)
}