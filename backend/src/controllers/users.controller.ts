import { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger";
import { signJwt } from "../lib/jwt";
import {
  createUser,
  getCUrrentUser,
  loginUser
} from "../services/users.service";

import {
    createUserSchema,
    loginUserSchema
} from "../schemas/users.schema"
import { AppError } from "../errors/AppError";

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

export async function loginUserHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try{
        logger.info(
            {
                email: req.body?.email,
                action: "login",
            },"User login request received"
        )
        const parsed = loginUserSchema.parse(req.body);
        const user = await loginUser(parsed)
        const token = signJwt({ userId: user.id });
        logger.info(
            {
                userId:user.id,
                email: user.email,
                action: "login_success"
            },'User login succeeded'
        )

        return res.status(200).json({
            message: "Login successful",
            user,
            token,
        })
    }catch(error){
        logger.error(
            {
                email: req.body?.email,
                action: "login_failure",
                err:error,
            },"User login failed"
        );
        return next(error)
    }
}

export async function getCurrentUserHandler(
    req:Request,
    res: Response,
    next: NextFunction
) {
    try {
        logger.info(
        {
            userId: req.user?.userId,
            action: "get_current_user",
        },
        "Get current user request received"
        );

        const userId = req.user?.userId;

        if(!userId){
            throw new AppError("Authentication required", 401, "UNAUTHORIZED")
        }

        const user = await getCUrrentUser(userId)

        logger.info(
        {
            userId: user.id,
            action: "get_current_user_success",
        },
        "Current user fetched successfully"
        );

        return res.status(200).json({
            message: "Current user fetched successfully",
            user
        });
        
    }catch(error){
        return next(error)
    }
}