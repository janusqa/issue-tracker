import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';

interface Props {
    params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
    });

    if (!issue) notFound();

    return (
        <div>
            <p>{issue.title}</p>
            <p>
                <IssueStatusBadge status={issue.status} />
            </p>
            <p>{issue.description}</p>
            <p>{issue.createdAt.toDateString()}</p>
        </div>
    );
};

export default IssueDetailPage;
