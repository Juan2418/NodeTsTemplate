import * as dotenv from 'dotenv';
import myContainer from './factory/inversify.config';
import { TYPES } from './serviceTypes/voteServiceTypes';
import { IVoteService } from './serviceTypes/IVoteService';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import VoteController from './controllers/VoteController';

dotenv.config();

const PORT: number = parseInt(process.env.PORT ?? ('3000' as string), 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const voteService = myContainer.get<IVoteService>(TYPES.IVoteService);
const voteController = new VoteController(voteService);

app.use('/api/v1', voteController.voteRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}: http://localhost:${PORT}`);
});
