'use client';

import { AlertDialog, Button } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // this is router for the new apps dir
// import { useRouter } from 'next/router'; // this is router from OLD pages navigation

interface Props {
    issueId: number;
}

const DeleteIssueButton = ({ issueId }: Props) => {
    const router = useRouter();
    return (
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
                            onClick={async () => {
                                await axios.delete(`/api/issues/${issueId}`);
                                router.push('/issues');
                                router.refresh();
                            }}
                        >
                            Delete Issue
                        </Button>
                    </AlertDialog.Action>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
};

export default DeleteIssueButton;
