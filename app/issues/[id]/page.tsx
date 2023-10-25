import prisma from '@/prisma/client';
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/authOptions';
import AssigneeSelect from './AssigneeSelect';
import { cache } from 'react';

interface Props {
    params: { id: string };
}

// Since we are using this call twice in this module
// we are using React Cache to cache the results
// https://nextjs.org/docs/app/building-your-application/caching#react-cache-function
const fetchIssue = cache((issueId: number) =>
    prisma.issue.findUnique({
        where: { id: issueId },
    })
);

const IssueDetailPage = async ({ params: { id } }: Props) => {
    const session = await getServerSession(authOptions);

    const issue = await fetchIssue(parseInt(id));
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    if (!issue) notFound();

    return (
        <Grid columns={{ initial: '1', sm: '5' }} gap="5">
            <Box className="md:col-span-4">
                <IssueDetails issue={issue} />
            </Box>

            {session && (
                <Box>
                    <div className="flex flex-col gap-4">
                        <AssigneeSelect issue={issue} />
                        <EditIssueButton issueId={issue.id} />
                        <DeleteIssueButton issueId={issue.id} />
                    </div>
                </Box>
            )}
        </Grid>
    );
};

export default IssueDetailPage;

export const generateMetadata = async ({ params: { id } }: Props) => {
    const issue = await fetchIssue(parseInt(id));

    return {
        title: issue?.title,
        description: `Issue details: ${issue?.description}`,
    };
};
