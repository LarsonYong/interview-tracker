import { ZodTypeAny, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export function validate(schema: ZodTypeAny){
    return (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            req.body = schema.parse(req.body);
            return next();
        }catch(error){
            if (error instanceof ZodError) {
                return next(
                    new AppError(
                        error.issues.map((issue) => issue.message).join(","),
                        400,
                        "VALIDATION_ERROR"
                    )
                )
            }

            return next(error)
        }
    }

}