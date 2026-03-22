import { Request, Response, NextFunction } from "express";
import {
  createInterview,
  deleteInterview,
  getAllInterviews,
  getInterviewById,
  updateInterview,
} from "../services/interview.service";
import {
  createInterviewSchema,
  updateInterviewSchema,
} from "../schemas/interview.schema";

export async function listInterviews(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const interviews = await getAllInterviews();
    res.json(interviews);
  } catch (error) {
    next(error);
  }
}

export async function getInterview(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const interview = await getInterviewById(id);

    if (!interview) {
      return res.status(404).json({ error: { message: "Interview not found" } });
    }

    res.json(interview);
  } catch (error) {
    next(error);
  }
}

export async function createInterviewHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const parsed = createInterviewSchema.parse(req.body);
    const interview = await createInterview(parsed);
    res.status(201).json(interview);
  } catch (error) {
    next(error);
  }
}

export async function updateInterviewHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const parsed = updateInterviewSchema.parse(req.body);
    const interview = await updateInterview(id, parsed);
    res.json(interview);
  } catch (error) {
    next(error);
  }
}

export async function deleteInterviewHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    await deleteInterview(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}