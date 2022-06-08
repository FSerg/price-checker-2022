import express from 'express';
import dotenv from 'dotenv';
import PriceRoutes from './price';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT;

// BACKEND
// ROUTES
app.use('/api', PriceRoutes);

// test route
app.get('/test', (req, res) => {
  res.status(200).send({ result: 'GET: /test' });
});

// FRONTEND
app.use(express.static('client/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});