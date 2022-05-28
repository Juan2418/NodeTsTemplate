import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { IVoteRepository } from '../repositoryTypes/IVoteRepository';
import { IVoteService } from '../serviceTypes/IVoteService';
import { TYPES } from '../repositoryTypes/voteRepositoryTypes';

@injectable()
class VoteService implements IVoteService {
  private _voteRepository: IVoteRepository;

  public constructor(@inject(TYPES.IVoteRepository) voteRepository: IVoteRepository) {
    this._voteRepository = voteRepository;
  }

  public saveVote(): string {
    return this._voteRepository.saveVote();
  }
}

export default VoteService;
