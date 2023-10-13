import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { IssueValidationSchema } from '@/app/Validationchema';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const validation = IssueValidationSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });

    const newIssue = await prisma.issue.create({
        data: {
            title: validation.data.title,
            description: validation.data.description,
        },
    });

    return NextResponse.json(newIssue, { status: 201 });
}
