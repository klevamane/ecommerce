import express from 'express';
import bodyparser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

// Log Http methods to the console
app.use(logger('dev'));

// Middlewares
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'You have arrived' });
});

app.listen(port, () => console.log(`The server is running on port ${port}`));
