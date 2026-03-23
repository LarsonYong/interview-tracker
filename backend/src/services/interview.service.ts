import { prisma } from "../lib/prisma";
import { CreateInterviewInput } from "../schemas/interview.schema";
import { InterviewStatus } from "@prisma/client";



export async function createInterview(userId: number, input: CreateInterviewInput) {
    return prisma.interview.create({
        data:{
            userId,
            company: input.company,
            role: input.role,
            stage: input.stage,
            status: input.status ?? InterviewStatus.active,
            jobUrl: input.jobUrl,
            salary: input.salary,
            notes: input.notes,
            interviewDate: input.interviewDate? new Date(input.interviewDate): undefined,
        }
    })
}

export async function getMyInterviews(userId:number) {
    const interviews = await prisma.interview.findMany({
        where: {userId },
        orderBy: {
            createdAt: 'desc',
        }
    });
    return interviews
}


export async function getInterviewById(userId:number, interviewId: string) {
    const interview = await prisma.interview.findFirst({
        where: {
            userId,
            id: interviewId 
        },
    });
    return interview
}
