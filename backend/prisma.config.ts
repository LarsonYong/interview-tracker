// backend/prisma.config.ts
import "dotenv/config";
import { defineConfig } from "@prisma/config"; // Ensure the '@' is there if using the official package

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // This tells Prisma: "Use the URL from .env, or fail if it's missing"
    url: process.env.DATABASE_URL,
  },
});