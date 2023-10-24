import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import IssueStatusFilter from './IssueStatusFilter';
import { Status } from '@prisma/client';

interface Props {
    status: Status | undefined;
}

const IssueActions = ({ status }: Props) => {
    return (
        <div className="flex justify-between mb-5">
            <IssueStatusFilter status={status} />
            <Button>
                <Link href="/issues/new">New Issue</Link>
            </Button>
        </div>
    );
};

export default IssueActions;
