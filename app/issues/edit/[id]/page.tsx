// import IssueForm from '@/app/issues/_components/IssueForm';
import dynamic from 'next/dynamic';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import IssueFormSkeleton from './loading';
import { cache } from 'react';

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
});

interface Props {
    params: {
        id: string;
    };
}

// Since we are using this call twice in this module
// we are using React Cache to cache the results
// https://nextjs.org/docs/app/building-your-application/caching#react-cache-function
const fetchIssue = cache((issueId: number) =>
    prisma.issue.findUnique({
        where: { id: issueId },
    })
);

const EditIssuePage = async ({ params: { id } }: Props) => {
    const issue = await fetchIssue(parseInt(id));

    if (!issue) notFound();

    return <IssueForm issue={issue} />;
};

export default EditIssuePage;

export const generateMetadata = async ({ params: { id } }: Props) => {
    const issue = await fetchIssue(parseInt(id));

    return {
        title: `Update ${issue?.title}`,
        description: `Issue details: ${issue?.description}`,
    };
};
