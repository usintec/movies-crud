require('dotenv').config();
import express from 'express';
import { DB } from './src/model/mysql';

const app = express();
const port = 3000;
DB.sequelize.sync({force: true})
.then(() => console.log('done creating db') )
.catch((err) => console.log(err) );
app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});