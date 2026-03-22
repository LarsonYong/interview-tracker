import { prisma } from "../lib/prisma";

export async function getAllInterviews() {
  return prisma.interview.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getInterviewById(id: number) {
  return prisma.interview.findUnique({
    where: { id },
  });
}

export async function createInterview(data: {
  company: string;
  role: string;
  location?: string;
  notes?: string;
}) {
  return prisma.interview.create({
    data,
  });
}

export async function updateInterview(
  id: number,
  data: Partial<{
    company: string;
    role: string;
    location: string;
    notes: string;
    status:
      | "APPLIED"
      | "PHONE_SCREEN"
      | "TECH_SCREEN"
      | "ONSITE"
      | "OFFER"
      | "REJECTED";
  }>
) {
  return prisma.interview.update({
    where: { id },
    data,
  });
}

export async function deleteInterview(id: number) {
  return prisma.interview.delete({
    where: { id },
  });
}