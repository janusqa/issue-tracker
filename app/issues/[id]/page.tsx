import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Box, Button, Card, Grid, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';

interface Props {
    params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
    });
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    if (!issue) notFound();

    return (
        <Grid columns={{ initial: '1', md: '2' }} gap="5">
            <Box>
                <Heading>{issue.title}</Heading>
                <div className="flex space-x-3 my-2">
                    <IssueStatusBadge status={issue.status} />
                    <Text as="p">{issue.createdAt.toDateString()}</Text>
                </div>
                <Card className="prose mt-5">
                    <ReactMarkdown>{issue.description}</ReactMarkdown>
                </Card>
            </Box>
            <Box>
                <Button>
                    <Pencil2Icon />
                    <Link href={`/issues/${id}/edit`}>Edit Issue</Link>
                </Button>
            </Box>
        </Grid>
    );
};

export default IssueDetailPage;
