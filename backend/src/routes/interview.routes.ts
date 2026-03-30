import { Router } from "express";
import {
  createInterviewHandler,
  deleteInterviewHandler,
  getInterviewByIdHandler,
  getMyInterviewsHandler,
  listInterviews,
  updateInterviewHandler,
} from "../controllers/interview.controller";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import { createInterviewSchema } from "../schemas/interview.schema";

const router = Router();

router.get("/", requireUser, getMyInterviewsHandler);
router.get("/:id",requireUser, getInterviewByIdHandler);
router.post("/",requireUser,validate(createInterviewSchema), createInterviewHandler);
router.patch("/:id",requireUser, updateInterviewHandler);
router.delete("/:id", deleteInterviewHandler);

export default router;