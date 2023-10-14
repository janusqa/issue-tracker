import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';
import React from 'react';

interface Props {
    status: Status;
}

const statusMap: Record<
    Status,
    { label: string; color: 'red' | 'violet' | 'green' }
> = {
    [Status.OPEN]: { label: 'Open', color: 'red' },
    [Status.IN_PROGRESS]: { label: 'In Progress', color: 'violet' },
    [Status.CLOSED]: { label: 'Closed', color: 'green' },
};

const IssueStatusBadge = ({ status }: Props) => {
    return (
        <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
    );
};

export default IssueStatusBadge;
