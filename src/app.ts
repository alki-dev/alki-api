import cors from 'cors';
import express from 'express';

import { httpLogger } from './logger';
import { apiToken, errorHandler } from './middleware';

const app = express();

app.use(express.json() as express.RequestHandler);
app.use(
  cors({
    allowedHeaders: ['x-auth-token', 'x-refresh-token', 'x-api-token'],
    exposedHeaders: ['x-auth-token', 'x-refresh-token'],
  }),
);

app.get('/health', (_req, res) => {
  res.send('OK');
});
app.get('/favicon.ico', (_req, res) => res.status(204).end());

app.use(httpLogger);

app.use(apiToken);

app.use('/', (req, res) => {
  res.status(404).send(`Not found: ${req.url}`);
});

app.use(errorHandler);

export default app;
