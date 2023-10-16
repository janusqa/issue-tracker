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
import { IssueSchema } from '@/app/Validationchema';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { Issue } from '@prisma/client';

// NOTE WE DECIDED TO LOAD ENTIRE ISSUE FORM DYNICMALLY INSTEAD SO BACK TO LOADIN THIS AS NORMAL
// We lazy load to disable ssr so this MDE component is rendered on
// client instead of server to avoide any bugs
// const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
//     ssr: false,
// });

export interface IssueFormData extends z.infer<typeof IssueSchema> {}

interface Props {
    issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
    const router = useRouter();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IssueFormData>({
        resolver: zodResolver(IssueSchema),
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleForm = async (data: IssueFormData) => {
        try {
            setIsSubmitting(true);
            if (issue) await axios.patch(`/api/issues/${issue.id}`, data);
            else await axios.post('/api/issues', data);
            router.push('/issues');
            router.refresh(); // force client-side cache to be refreshed
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
                        defaultValue={issue?.title}
                        placeholder="title"
                        {...register('title')}
                    ></TextField.Input>
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => (
                        <SimpleMDE placeholder="Description" {...field} />
                    )}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>
                    {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    );
};

export default IssueForm;
