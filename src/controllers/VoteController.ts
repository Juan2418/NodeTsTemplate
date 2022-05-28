import express from 'express';
import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { IVoteService } from '../serviceTypes/IVoteService';
import { TYPES } from '../serviceTypes/voteServiceTypes';

@injectable()
class VoteController {
  private _voteService: IVoteService;
  public path = '/votes';
  public voteRouter = express.Router();

  public constructor(@inject(TYPES.IVoteService) voteService: IVoteService) {
    this._voteService = voteService;
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.voteRouter.post(this.path, this.vote);
  }

  public vote = async (req: Request, res: Response) => {
    res.send(this._voteService.saveVote());
  };
}

export default VoteController;
