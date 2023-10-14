import { Card, Heading } from '@radix-ui/themes';
import Skeleton from '@/app/components/Skeleton';

const LoadingIssueDetailPage = () => {
    return (
        <div className="max-w-xl">
            <Skeleton />
            <div className="flex space-x-3 my-2">
                <Skeleton width="5rem" />
                <Skeleton width="8rem" />
            </div>
            <Card className="prose mt-5">
                <Skeleton count={3} />
            </Card>
        </div>
    );
};

export default LoadingIssueDetailPage;
