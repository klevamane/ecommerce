import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import flash from 'connect-flash';
import session from 'express-session';
import passport from 'passport';

import CustomerRoutes from './api/routes/customer';
import CustomerEntityRoutes from './api/routes/customer_entity';
import DepartmentRoutes from './api/routes/departments';
import CategoryRoutes from './api/routes/category';

const app = express();
const port = process.env.PORT || 4000;

// Log Http methods to the console
app.use(logger('dev'));

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
require('./api/config/passport')(passport);

app.use(session({ secret: 'secret' }));

app.use(flash());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'You have arrived' });
});

app.use('/api/v1/customers', CustomerRoutes);
app.use('/api/v1/customer', CustomerEntityRoutes);
app.use('/api/v1/departments', DepartmentRoutes);
app.use('/api/v1/categories', CategoryRoutes);


app.listen(port, () => console.log(`The server is running on port ${port}`));
