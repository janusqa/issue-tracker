import { Status } from '@prisma/client';
import { Card, Text } from '@radix-ui/themes';
import Link from 'next/link';

interface Props {
    open: number;
    inProgress: number;
    closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
    const summeries: { label: string; value: number; status: Status }[] = [
        {
            label: 'Open Issues',
            value: open,
            status: 'OPEN',
        },
        {
            label: 'In Progress Issues',
            value: inProgress,
            status: 'IN_PROGRESS',
        },
        {
            label: 'Closed Issues',
            value: closed,
            status: 'CLOSED',
        },
    ];
    return (
        <div className="flex gap-4">
            {summeries.map((summary) => (
                <Card key={summary.status}>
                    <div className="flex flex-col gap-1">
                        <Link
                            className="text-sm font-medium"
                            href={`/issues/index?status=${summary.status}`}
                        >
                            {summary.label}
                        </Link>
                    </div>
                    <Text size="5" className="font-bold">
                        {summary.value}
                    </Text>
                </Card>
            ))}
        </div>
    );
};

export default IssueSummary;
