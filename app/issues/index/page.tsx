import { Table } from '@radix-ui/themes';
import AppLink from '@/app/components/Link';
import Link from 'next/link';
import prisma from '@/prisma/client';
import IssueStatusBadge from '../../components/IssueStatusBadge';
import IssueActions from './IssueActions';
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import Pagination from '@/app/components/Pagination';

interface Props {
    searchParams: { status: Status; orderBy: keyof Issue; page: string };
}

const IssuesPage = async ({ searchParams }: Props) => {
    const columns: { label: string; value: keyof Issue; className?: string }[] =
        [
            { label: 'Issue', value: 'title' },
            {
                label: 'Status',
                value: 'status',
                className: 'hidden md:table-cell',
            },
            {
                label: 'Created',
                value: 'createdAt',
                className: 'hidden md:table-cell',
            },
        ];

    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status)
        ? searchParams.status
        : undefined;

    const where = { status };

    const orderBy = columns
        .map((column) => column.value)
        .includes(searchParams.orderBy)
        ? { [searchParams.orderBy]: 'asc' }
        : undefined;

    const page = parseInt(searchParams.page) || 1;
    const pageSize = 10;

    const issues = await prisma.issue.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const issueCount = await prisma.issue.count({ where });

    // await new Promise((resolve) => setTimeout(resolve, 2000));

    return (
        <div>
            <IssueActions />
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        {columns.map((column) => (
                            <Table.ColumnHeaderCell
                                key={column.value}
                                className={column.className}
                            >
                                <Link
                                    href={{
                                        query: {
                                            ...searchParams,
                                            orderBy: column.value,
                                        },
                                    }}
                                >
                                    {column.label}
                                </Link>
                                {column.value === searchParams.orderBy && (
                                    <ArrowUpIcon className="inline" />
                                )}
                            </Table.ColumnHeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {issues.map((issue) => (
                        <Table.Row key={issue.id}>
                            <Table.ColumnHeaderCell>
                                <AppLink href={`/issues/${issue.id}`}>
                                    {issue.title}
                                </AppLink>
                                <div className="block md:hidden">
                                    <IssueStatusBadge status={issue.status} />
                                </div>
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="hidden md:table-cell">
                                <IssueStatusBadge status={issue.status} />
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="hidden md:table-cell">
                                {issue.createdAt.toDateString()}
                            </Table.ColumnHeaderCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
            <Pagination
                pageSize={pageSize}
                currentPage={page}
                itemCount={issueCount}
            />
        </div>
    );
};

// FULL ROUTE CACHING (cache on the server)
// Used to stroe the output of statically rendered routs (routes witout params)
//
// This is a static page since it has no parameters.
// At build time it will be rendered and stored on the server
// We however need it to be dynamic since we need to see new
// issues that we add we can use either of the below which means
// cache for 0 seconds.
// Note: This is server side cache
export const dynamic = 'force-dynamic';
// export const revalidate = 0

export default IssuesPage;

// Other types of caching
// DATA CACHE
// - used when fectching data with "Fetch API"
// - stored in the FileSystem
// - Permanent until we redeploy
// eg.  fetch('...', {cache: 'no-cache'})
// eg.  fetch('...', {next: {revalidate: 3600}})

// Router Caching (client side caching)
// This exists on the client in browser memory
// - stores the payload of pages as user navigates
// - lasts for a session
// - can be cleared by doing a browser refresh
// - by default statically rendered routes are refreshed every 5 mins
// - by default dynamically rendered routes are refreshed every 30s
// - we can force a revalidation by calling router.refresh
