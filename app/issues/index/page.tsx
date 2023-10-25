import prisma from '@/prisma/client';
import IssueActions from './IssueActions';
import { Status } from '@prisma/client';
import Pagination from '@/app/components/Pagination';
import IssueTable, { IssueSearchParams, columnNames } from './IssueTable';
import { Metadata } from 'next';

interface Props {
    searchParams: IssueSearchParams;
}

const IssuesPage = async ({ searchParams }: Props) => {
    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status)
        ? searchParams.status
        : undefined;

    const where = { status };

    const orderBy = columnNames.includes(searchParams.orderBy)
        ? { [searchParams.orderBy]: 'asc' }
        : undefined;

    const pageSize = 10;
    const currentPage = parseInt(searchParams.page) || 1;
    const itemCount = await prisma.issue.count({ where });

    const issues = await prisma.issue.findMany({
        where,
        orderBy,
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
    });

    // await new Promise((resolve) => setTimeout(resolve, 2000));

    return (
        <div className="flex flex-col gap-3">
            <IssueActions />
            <IssueTable searchParams={searchParams} issues={issues} />
            <Pagination
                pageSize={pageSize}
                currentPage={currentPage}
                itemCount={itemCount}
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

export const metadata: Metadata = {
    title: 'Bug Tracker - Issues',
    description: 'Manage your project issues',
};
