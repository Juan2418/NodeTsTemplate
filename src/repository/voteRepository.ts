import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { IVoteRepository } from '../repositoryTypes/IVoteRepository';
import { TYPES } from '../repositoryTypes/voteRepositoryTypes';

@injectable()
class VoteRepository implements IVoteRepository {
  public constructor() {}

  saveVote(): string {
    return 'Hello, dependency injection!';
  }
}

export default VoteRepository;
