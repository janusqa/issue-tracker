'use client';

import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Button, TextField } from '@radix-ui/themes';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const IssueFormSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
});

export interface IssueForm extends z.infer<typeof IssueFormSchema> {}

const NewIssuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit } = useForm<IssueForm>();
    return (
        <form
            className="max-w-xl space-y-3"
            onSubmit={handleSubmit(async (data) => {
                await axios.post('/api/issues', data);
                router.push('/issues');
            })}
        >
            <TextField.Root>
                <TextField.Input
                    placeholder="title"
                    {...register('title')}
                ></TextField.Input>
            </TextField.Root>
            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <SimpleMDE placeholder="Description" {...field} />
                )}
            />
            <Button>Submit New Issue</Button>
        </form>
    );
};

export default NewIssuePage;
