'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import React from 'react';

const statuses: { label: string; value: Status }[] = [
    { label: 'Open', value: 'OPEN' },
    { label: 'Closed', value: 'CLOSED' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
];

interface Props {
    status: Status | undefined;
}

const IssueStatusFilter = ({ status }: Props) => {
    const router = useRouter();

    const onFilterStatus = (status: string) => {
        const queryString = status === 'ALL' ? '' : `?status=${status}`;
        router.push(`/issues/index${queryString}`);
    };

    return (
        <Select.Root onValueChange={onFilterStatus} defaultValue={status || ''}>
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
