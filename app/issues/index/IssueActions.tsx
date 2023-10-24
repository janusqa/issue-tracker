import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import IssueStatusFilter from './IssueStatusFilter';
import { Status } from '@prisma/client';

const IssueActions = () => {
    return (
        <div className="flex justify-between">
            <IssueStatusFilter />
            <Button>
                <Link href="/issues/new">New Issue</Link>
            </Button>
        </div>
    );
};

export default IssueActions;
