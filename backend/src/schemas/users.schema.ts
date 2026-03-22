import { z } from "zod";

export const createUserSchema = z.object({
    email: z.email("Invalid email format"),
    password: z.string().trim().min(6, "password must be at least 6 characters"),
    name: z.string().trim().min(1, "name is required"),
})