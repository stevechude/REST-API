import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import logger from '../utils/logger';

export const createUserHandler = async (req: Request<{}, {}, CreateUserInput["body"]>, res: Response) => {
    try {
        const user = await createUser(req.body);
        
        return res.send(user);
    } catch (err:any) {
        logger.error(err)
        res.status(409).send(err.message)
    }
};

// return res.send(omit(user.toJSON(), "password"));