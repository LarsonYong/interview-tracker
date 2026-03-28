import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({
  connectionString: databaseUrl,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.interview.deleteMany();

  await prisma.interview.createMany({
    data: [
      {
        userId: 1,
        company: "Google",
        role: "Frontend Engineer",
        stage: "APPLIED",
        status: "active",
        jobUrl: "https://careers.google.com",
        salary: 180000,
        notes: "Applied via referral",
        interviewDate: null,
      },
      {
        userId: 1,
        company: "Meta",
        role: "Software Engineer",
        stage: "PHONE",
        status: "active",
        jobUrl: "https://careers.meta.com",
        salary: 190000,
        notes: "Recruiter call scheduled",
        interviewDate: new Date("2026-03-28T16:00:00.000Z"),
      },
      {
        userId: 1,
        company: "Apple",
        role: "UI Engineer",
        stage: "ONSITE",
        status: "passed",
        jobUrl: "https://jobs.apple.com",
        salary: 200000,
        notes: "Onsite completed, waiting feedback",
        interviewDate: new Date("2026-03-15T10:00:00.000Z"),
      },
      {
        userId: 1,
        company: "Notion",
        role: "Product Engineer",
        stage: "OFFER",
        status: "offer",
        jobUrl: "https://notion.so/careers",
        salary: 185000,
        notes: "Offer received, reviewing",
        interviewDate: null,
      },
      {
        userId: 1,
        company: "Airbnb",
        role: "Software Engineer",
        stage: "REJECTED",
        status: "rejected",
        jobUrl: "https://careers.airbnb.com",
        salary: null,
        notes: "Rejected after tech screen",
        interviewDate: null,
      },
      {
        userId: 1,
        company: "Stripe",
        role: "Fullstack Engineer",
        stage: "TECH_SCREEN",
        status: "active",
        jobUrl: "https://stripe.com/jobs",
        salary: 210000,
        notes: "Take-home assignment submitted, waiting for feedback",
        interviewDate: new Date("2026-04-02T10:00:00.000Z"),
      },
      {
        userId: 1,
        company: "OpenAI",
        role: "Frontend Engineer",
        stage: "FINAL",
        status: "passed",
        jobUrl: "https://openai.com/careers",
        salary: 220000,
        notes: "Final round done, strong positive signals",
        interviewDate: new Date("2026-03-25T15:00:00.000Z"),
      },
    ],
  });

  console.log("✅ Seed data inserted");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });