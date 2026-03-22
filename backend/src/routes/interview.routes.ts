import { Router } from "express";
import {
  createInterviewHandler,
  deleteInterviewHandler,
  getInterview,
  listInterviews,
  updateInterviewHandler,
} from "../controllers/interview.controller";

const router = Router();

router.get("/", listInterviews);
router.get("/:id", getInterview);
router.post("/", createInterviewHandler);
router.patch("/:id", updateInterviewHandler);
router.delete("/:id", deleteInterviewHandler);

export default router;