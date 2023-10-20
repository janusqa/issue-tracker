'use client';

import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Skeleton from '@/app/components/Skeleton';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
    issue: Issue;
}

const AssigneeSelect = ({ issue }: Props) => {
    const {
        data: users,
        error,
        isLoading,
    } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get<User[]>('/api/users').then((res) => res.data),
        staleTime: 60 * 1000,
        retry: 3,
    });

    if (isLoading) return <Skeleton />;

    if (error) return null;

    return (
        <>
            <Select.Root
                defaultValue={issue.assigneeId || 'unassigned'}
                onValueChange={async (assigneeId) => {
                    try {
                        await axios.patch(`/api/issues/${issue.id}`, {
                            assigneeId:
                                assigneeId === 'unassigned' ? null : assigneeId,
                        });
                    } catch (error) {
                        toast.error('Changes could not be saved.');
                    }
                }}
            >
                <Select.Trigger placeholder="Assign..." />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value="unassigned">Unassigned</Select.Item>
                        {users?.map((user) => (
                            <Select.Item key={user.id} value={user.id}>
                                {user.name}
                            </Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>
    );
};

export default AssigneeSelect;
