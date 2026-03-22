import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { logger } from "../lib/logger";

export async function createUser(data:{
    email: string;
    password: string
    name: string
}) {
    logger.info({ email: data.email }, "Creating user");
    const passwordHash = await bcrypt.hash(data.password, 10);
    try {
        const user = await prisma.user.create({
            data: {
                email: data.email,
                passwordHash,
                name: data.name,               
            }
        });
        
        return user;
    }catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
            throw new Error("EMAIL_ALREADY_EXISTS");
        }
        }
        throw error;        
    }
}