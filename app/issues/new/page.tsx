import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';
// import IssueForm from '@/app/issues/_components/IssueForm';
const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
    // sinse we are loading mde dynically in issue form it is loaded
    // after everything else which does not look good
    // lets load Issue form dynically to improve how the page loads
    // such that everythign loads together
    // Dont forget to go to Issue form and load MDE as normal now
    // we do not need to load it dynically there since we are loaging
    // entire form here dynaically
    return <IssueForm />;
};

export default NewIssuePage;
