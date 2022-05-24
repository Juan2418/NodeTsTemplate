import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { helloWorldRouter } from './routers/helloworld.router';

dotenv.config();

const PORT: number = parseInt(process.env.PORT ?? ('3000' as string), 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/hello', helloWorldRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}: http://localhost:${PORT}`);
});
