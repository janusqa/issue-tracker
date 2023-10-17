import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { Issue } from '@prisma/client';
import { Card, Heading, Text } from '@radix-ui/themes';
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
    issue: Issue;
}

const IssueDetails = ({ issue }: Props) => {
    return (
        <>
            <Heading>{issue.title}</Heading>
            <div className="flex space-x-3 my-2">
                <IssueStatusBadge status={issue.status} />
                <Text as="p">{issue.createdAt.toDateString()}</Text>
            </div>
            <Card className="prose max-w-full mt-4">
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </>
    );
};

export default IssueDetails;
