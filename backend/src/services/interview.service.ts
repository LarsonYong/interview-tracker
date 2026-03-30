import { prisma } from "../lib/prisma";
import { CreateInterviewInput, UpdateInterviewBodyInput } from "../schemas/interview.schema";
import { InterviewStatus, InterviewStage } from "@prisma/client";



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


export async function updateInterview(
    userId: number,
    interviewId: string,
    input: UpdateInterviewBodyInput
    ) {
    const existingInterview = await prisma.interview.findFirst({
        where: {
            id: interviewId,
            userId
        },
    });
    if (!existingInterview){
        return null;
    }

    const data = {
    ...input,
    interviewDate:
        input.interviewDate === undefined
        ? undefined
        : input.interviewDate === null
        ? null
        : new Date(input.interviewDate),
    };

    const updatedInterview = await prisma.interview.update({
        where:{
            id: interviewId,
        },
        data,
    })

    return updatedInterview;
}


export async function deleteInterview(
    userId: number,
    interviewId: string
) {
    const existingInterview = await prisma.interview.findFirst({
        where: {
            id: interviewId,
            userId
        },
    })

    if (!existingInterview) {
        return null;
    }

    await prisma.interview.delete({
        where: {
            id: interviewId
        }
    });

    return {success: true}
}