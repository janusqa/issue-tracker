'use client';

import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Button, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
    console.log(itemCount, pageSize, currentPage);
    const router = useRouter();
    const searchParams = useSearchParams();

    const pageCount = Math.ceil(itemCount / pageSize);

    const changePage = (page: number) => {
        const currentPage = page < 1 ? 1 : page > pageCount ? pageCount : page;
        const query = new URLSearchParams(searchParams);
        query.set('page', currentPage.toString());

        const queryString = query.size > 0 ? `?${query.toString()}` : '';
        router.push(`/issues/index${queryString}`);
    };

    if (pageCount <= 1) return null;

    return (
        <div className="flex items-center gap-2">
            <Text size="2">
                Page {currentPage} of {pageCount}
            </Text>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === 1}
                onClick={() => changePage(1)}
            >
                <DoubleArrowLeftIcon />
            </Button>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}
            >
                <ChevronLeftIcon />
            </Button>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === pageCount}
                onClick={() => changePage(currentPage + 1)}
            >
                <ChevronRightIcon />
            </Button>
            <Button
                onClick={() => changePage(pageCount)}
                color="gray"
                variant="soft"
                disabled={currentPage === pageCount}
            >
                <DoubleArrowRightIcon />
            </Button>
        </div>
    );
};

export default Pagination;
