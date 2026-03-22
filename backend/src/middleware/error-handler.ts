import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { logger } from "../lib/logger";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error({ err: error }, "Request failed");
  if (error instanceof ZodError) {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid request body",
        details: error.flatten(),
      },
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(400).json({
      error: {
        code: "DATABASE_ERROR",
        message: error.message,
      },
    });
  }

  console.error(error);

  return res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong",
    },
  });
}