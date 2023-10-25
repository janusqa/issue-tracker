import prisma from '@/prisma/client';
import { Avatar, Card, Heading, Table } from '@radix-ui/themes';
import IssueStatusBadge from './components/IssueStatusBadge';
import Link from 'next/link';

const LatestIssues = async () => {
    const issues = await prisma.issue.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { user: true },
    });
    return (
        <Card>
            <Heading size="4" mb="5">
                Latest Issues
            </Heading>
            <Table.Root>
                <Table.Body>
                    {issues.map((issue) => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <div className="flex justify-between">
                                    <div className="flex flex-col items-start gap-2">
                                        <Link href={`/issues/${issue.id}`}>
                                            {issue.title}
                                        </Link>
                                        <IssueStatusBadge
                                            status={issue.status}
                                        />
                                    </div>
                                    {issue.user && (
                                        <Avatar
                                            src={issue.user.image!}
                                            fallback="?"
                                            size="2"
                                            radius="full"
                                        />
                                    )}
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Card>
    );
};

export default LatestIssues;
