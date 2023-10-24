'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const statuses: { label: string; value: Status }[] = [
    { label: 'Open', value: 'OPEN' },
    { label: 'Closed', value: 'CLOSED' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
];

const IssueStatusFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const onFilterStatus = (status: string) => {
        const query = new URLSearchParams();
        if (status && status !== 'ALL') query.append('status', status);
        if (searchParams.get('orderBy'))
            query.append('orderBy', searchParams.get('orderBy')!);

        const queryString = query.size > 0 ? `?${query.toString()}` : '';
        router.push(`/issues/index${queryString}`);
    };

    return (
        <Select.Root
            onValueChange={onFilterStatus}
            defaultValue={searchParams.get('status') || ''}
        >
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
