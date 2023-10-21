'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import React from 'react';

const statuses: { label: string; value: Status }[] = [
    { label: 'Open', value: 'OPEN' },
    { label: 'Closed', value: 'CLOSED' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
];

const IssueStatusFilter = () => {
    return (
        <Select.Root>
            <Select.Trigger placeholder="Filter by status..." />
            <Select.Content>
                <Select.Group>
                    <Select.Item value="ALL">All Statuses</Select.Item>
                    {statuses.map((status) => (
                        <Select.Item key={status.value} value={status.value}>
                            {status.label}
                        </Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default IssueStatusFilter;
