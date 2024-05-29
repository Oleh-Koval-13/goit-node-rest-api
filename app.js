import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

import contactsRouter from './routes/contactsRouter.js';
import authRouter from './routes/authRouter.js';

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/users', authRouter);
app.use('/api/contacts', contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

const uri = process.env.DB_URI;

// run server
(async () => {
  try {
    await mongoose.connect(uri);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log('Database connection successful');

    app.listen(8000, () => {
      console.log(`Server is running. Use our API on port: 8000`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();