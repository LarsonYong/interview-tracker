import { Router } from "express";
import {
    registerUserHandler,
    loginUserHandler,
    getCurrentUserHandler,
} from "../controllers/users.controller";
import { requireUser } from "../middleware/requireUser";
import { getCUrrentUser } from "../services/users.service";

const router = Router();


router.post("/register", registerUserHandler);
router.post("/login", loginUserHandler)
router.get("/me", requireUser, getCurrentUserHandler)

export default router;