import { IssueSchema } from '@/app/Validationchema';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/authOptions';

interface Params {
    params: { id: string };
}

export async function PATCH(req: NextRequest, { params }: Params) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const validation = IssueSchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!issue)
        return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title: validation.data.title,
            description: validation.data.description,
        },
    });

    return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(req: NextRequest, { params }: Params) {
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!issue)
        return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

    const deletedIssue = await prisma.issue.delete({
        where: { id: issue.id },
    });

    return NextResponse.json(deletedIssue, { status: 200 });
}
