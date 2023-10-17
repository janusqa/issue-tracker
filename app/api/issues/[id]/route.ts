import { IssueSchema } from '@/app/Validationchema';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
    params: { id: string };
}

export async function PATCH(req: NextRequest, { params }: Params) {
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
