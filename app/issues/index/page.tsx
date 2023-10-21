import React from 'react';
import { Table } from '@radix-ui/themes';
import Link from '@/app/components/Link';
import prisma from '@/prisma/client';
import IssueStatusBadge from '../../components/IssueStatusBadge';
import IssueActions from './IssueActions';
import { Status } from '@prisma/client';

interface Props {
    searchParams: { status: Status };
}

const IssuesPage = async ({ searchParams }: Props) => {
    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status)
        ? searchParams.status
        : undefined;

    const issues = await prisma.issue.findMany({ where: { status } });

    // await new Promise((resolve) => setTimeout(resolve, 2000));

    return (
        <div>
            <IssueActions />
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">
                            Status
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">
                            Created
                        </Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {issues.map((issue) => (
                        <Table.Row key={issue.id}>
                            <Table.ColumnHeaderCell>
                                <Link href={`/issues/${issue.id}`}>
                                    {issue.title}
                                </Link>
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
