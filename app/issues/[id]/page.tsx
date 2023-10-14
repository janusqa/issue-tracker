import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Card, Heading, Text } from '@radix-ui/themes';
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
            <Heading>{issue.title}</Heading>
            <div className="flex space-x-3 my-2">
                <IssueStatusBadge status={issue.status} />
                <Text as="p">{issue.createdAt.toDateString()}</Text>
            </div>
            <Card>
                <p>{issue.description}</p>
            </Card>
        </div>
    );
};

export default IssueDetailPage;
