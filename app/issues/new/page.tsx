'use client';

import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Button, Callout, TextField } from '@radix-ui/themes';
import { useState } from 'react';
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
    const [error, setError] = useState('');

    const handleForm = async (data: IssueForm) => {
        try {
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            console.log(error);
            setError('An unexpected error occured');
        }
    };

    return (
        <div className="max-w-xl">
            {error && (
                <Callout.Root color="red" className="mb-5">
                    <Callout.Text>
                        You will need admin privileges to install and access
                        this application.
                    </Callout.Text>
                </Callout.Root>
            )}
            <form className="space-y-3" onSubmit={handleSubmit(handleForm)}>
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
        </div>
    );
};

export default NewIssuePage;
