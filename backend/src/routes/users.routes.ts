import { Router } from "express";
import {
    registerUserHandler
} from "../controllers/users.controller";

const router = Router();


router.post("/register", registerUserHandler);


export default router;