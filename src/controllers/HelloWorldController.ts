import { Request, Response } from "express";

export const getHelloWorld = async (req: Request, res: Response) => {
		res.send('Hello World!');
};

export default {getHelloWorld};

