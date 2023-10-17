'use client';

import { AlertDialog, Button } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // this is router for the new apps dir
import { useState } from 'react';
// import { useRouter } from 'next/router'; // this is router from OLD pages navigation

interface Props {
    issueId: number;
}

const DeleteIssueButton = ({ issueId }: Props) => {
    const router = useRouter();
    const [error, setError] = useState<boolean>(false);

    const deleteIssue = async (issueId: number) => {
        try {
            await axios.delete(`/api/issues/${issueId}`);
            router.push('/issues');
            router.refresh();
        } catch (error) {
            setError(true);
        }
    };

    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red">Delete Issue</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description>
                        Are you sure you want to delete this issue? This action
                        cannot be undone.
                    </AlertDialog.Description>
                    <div className="flex gap-4 mt-4">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button
                                color="red"
                                onClick={() => deleteIssue(issueId)}
                            >
                                Delete Issue
                            </Button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>
                        This issue could not be deleted.
                    </AlertDialog.Description>

                    <Button
                        variant="soft"
                        color="gray"
                        mt="4"
                        onClick={() => setError(false)}
                    >
                        Cancel
                    </Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    );
};

export default DeleteIssueButton;
