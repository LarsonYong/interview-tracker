import { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger";
import {
  createUser
} from "../services/users.service";

import {
    createUserSchema
} from "../schemas/users.schema"

export async function registerUserHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try{
        logger.info(
            {
                email: req.body?.email,
                hasPassword: !!req.body?.password,
            },
            "Received user registration request"
        );
        const parsed = createUserSchema.parse(req.body);
        const user = await createUser(parsed);
        logger.info(
            {
                userId: user.id,
                email: user.email,
            },
            "User registered succeeded"
        );
        res.status(201).json({
            id: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
            });
    }catch (error) {
    next(error);
  }
} 
