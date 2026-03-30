import { Request, Response, NextFunction } from "express";
import {
  createInterview,
  getInterviewById,
  getMyInterviews,
  updateInterview,
  deleteInterview,
} from "../services/interview.service";
import {
  createInterviewSchema,
  updateInterviewBodySchema,
  updateInterviewParamsSchema,
} from "../schemas/interview.schema";
import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";
import { logger } from "../lib/logger";
import { AppError } from "../errors/AppError";

export async function listInterviews(
  _req: Request,
  res: Response,
  next: NextFunction
) {

}

export async function getMyInterviewsHandler(
    req: Request,
    res: Response,
    next: NextFunction
){
    try{

        const userId = req.user!.userId
        logger.info({userId}, "Fetching user interviews")

        const interviews = await getMyInterviews(userId)
        logger.info({ count: interviews.length, userId }, "Fetched user interviews");
        return res.status(200).json(interviews);

    }catch(error){
        next(error)
    }
}

export async function getInterviewByIdHandler(
    req: Request,
    res: Response,
    next: NextFunction
){
    try{

        const userId = req.user!.userId
        const interviewId = req.params.id as string
        logger.info({ userId, interviewId },"fetching interview by id")

        const interview = await getInterviewById(userId, interviewId)

        if (!interview) {
            logger.warn({ userId, interviewId }, "Interview not found");
            throw new AppError("Interview not found", 404, "NOT_FOUND");
        }

        logger.info({ userId, interviewId }, "Fetched user intervew by id");
        return res.status(200).json(interview);

    }catch(error){
        next(error)
    }
}


export async function createInterviewHandler(
  req: Request,
  res: Response,
  next: NextFunction
) { 
    try {
        const userId = req.user!.userId
        logger.info({userId, company:req.body.company, role: req.body.role}, "Creating interview")
        const interview = await createInterview(userId,req.body);
        logger.info({userId, interviewId: interview.id, company: interview.company,role:interview.role}, "Interveiw created");
        return res.status(201).json(interview)

    }catch(error){
        return next(error)
    }
}

export async function updateInterviewHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
    try{
        const userId = req.user!.userId
        const interviewId = req.params.id as string
        logger.info({userId, interviewId}, "Updating interview")
        updateInterviewParamsSchema.parse(req.params);
        const updateData = updateInterviewBodySchema.parse(req.body)

        const interview = await updateInterview(userId, interviewId, updateData)

        if(!interview){
            logger.warn({userId, interviewId}, "Interview not found for update")
            throw new AppError("Interview not found", 404, "NOT_FOUND");
        }

        logger.info({userId, interviewId}, "Interview updated")

        return res.status(200).json(interview)

    }catch(error){
        next(error)
    }
}

export async function deleteInterviewHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
    try {
        const userId = req.user!.userId
        const interviewId = req.params.id as string
        logger.info({userId, interviewId}, "Deleting interview")

        const result = await deleteInterview(userId, interviewId);

        updateInterviewParamsSchema.parse(req.params);

        if (!result) {
            logger.warn({ userId, interviewId }, "Interview not found for delete");
            throw new AppError("Interview not found", 404, "NOT_FOUND");
        }

        logger.info({ userId, interviewId }, "Interview deleted");
        return res.status(200).json(result);

    }catch(error) {
        next(error)
    }
  }
