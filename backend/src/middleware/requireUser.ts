import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { verifyJwt } from "../lib/jwt";

export function requireUser(
    req: Request,
    _res: Response,
    next: NextFunction
){
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader  ||!authHeader.startsWith("Bearer ")){
            throw new AppError("Authentication required", 401, "UNAUTHORIZED");
        }
        const token = authHeader.split(" ")[1];
        const decoded = verifyJwt(token);

        req.user = {userId: decoded.userId};
        
        return next()
    }catch(error){
        return next(error)
    }
}