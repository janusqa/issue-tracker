'use client';

// import dynamic from 'next/dynamic';
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
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

// We lazy load to disable ssr so this MDE component is rendered on
// client instead of server to avoide any bugs
// NOTE: this bug was fixed so now we can load compent as normal
// Comment out below and dynamic above
// Re-enable the simpleMDE import as normal
// const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
//     ssr: false,
// });

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
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleForm = async (data: IssueForm) => {
        try {
            setIsSubmitting(true);
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            setIsSubmitting(false);
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
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <SimpleMDE placeholder="Description" {...field} />
                    )}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>
                    Submit New Issue {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
