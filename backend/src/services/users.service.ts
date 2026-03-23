import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { logger } from "../lib/logger";
import { AppError } from "../errors/AppError";

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


export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401, "UNAUTHORIZED");
  }

  const isValid = await bcrypt.compare(data.password, user.passwordHash);

  if (!isValid) {
    throw new AppError("Invalid email or password", 401, "UNAUTHORIZED");
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}

export async function getCUrrentUser(userId:number) {
    const user = await prisma.user.findUnique({
        where: {id: userId}
    });

    if (!user){
        throw new AppError("User not found", 404, "NOT_FOUND")
    }

    return {
        id: user.id,
        email: user.email,
        name: user.name,
    }
}