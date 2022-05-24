import express from 'express';
import * as HelloWorldController from '../controllers/HelloWorldController';

export const helloWorldRouter = express.Router();

helloWorldRouter.get('/', HelloWorldController.getHelloWorld);
