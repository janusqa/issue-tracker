'use client';

import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Button, Callout, TextField, Text } from '@radix-ui/themes';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { IssueValidationSchema } from '@/app/Validationchema';

export interface IssueForm extends z.infer<typeof IssueValidationSchema> {}

const NewIssuePage = () => {
    const router = useRouter();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IssueForm>({
        resolver: zodResolver(IssueValidationSchema),
    });
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
                {errors.title && (
                    <Text as="p" color="red">
                        {errors.title.message}
                    </Text>
                )}
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <SimpleMDE placeholder="Description" {...field} />
                    )}
                />
                {errors.description && (
                    <Text as="p" color="red">
                        {errors.description.message}
                    </Text>
                )}

                <Button>Submit New Issue</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
