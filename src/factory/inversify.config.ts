import { Container } from 'inversify';
import { TYPES as REPOSITORY_TYPES } from '../repositoryTypes/voteRepositoryTypes';
import { TYPES as SERVICE_TYPES } from '../serviceTypes/voteServiceTypes';
import { IVoteRepository } from '../repositoryTypes/IVoteRepository';
import { IVoteService } from '../serviceTypes/IVoteService';
import VoteRepository from '../repository/voteRepository';
import VoteService from '../services/VoteService';

const myContainer = new Container();
myContainer.bind<IVoteRepository>(REPOSITORY_TYPES.IVoteRepository).to(VoteRepository);
myContainer.bind<IVoteService>(SERVICE_TYPES.IVoteService).to(VoteService);

export default myContainer;
