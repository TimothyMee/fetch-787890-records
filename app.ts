import * as express from 'express';
import * as bodyParser from 'body-parser';
import { routes } from './routes/index';
import { config } from 'dotenv';

config();
//connect database
require('./lib/db_conn');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// setup app routes here
app.use(routes);

export { app };

// app.listen(PORT, () => {
//     console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
// });