'use client';

import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { set } from 'zod';

const AssigneeSelect = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(function () {
        const fetchUsers = async () => {
            const { data: users } = await axios.get<User[]>('/api/users');
            setUsers(users);
        };
        void fetchUsers();
    }, []);

    return (
        <Select.Root>
            <Select.Trigger placeholder="Assign..." />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {users.map((user) => (
                        <Select.Item key={user.id} value={user.id}>
                            {user.name}
                        </Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default AssigneeSelect;
