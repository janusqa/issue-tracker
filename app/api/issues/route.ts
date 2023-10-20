import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { IssueSchema } from '@/app/Validationchema';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/authOptions';

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const validation = IssueSchema.safeParse(body);
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
