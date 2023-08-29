import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";
import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();

  let title = 'An Error occurred!';
  let message = 'Có gì đó không đúng !';

  if (error.state === 500) {
    message = error.data.message;
  }
  if (error.state === 404) {
    title = 'Không tìm thấy á'
    message = 'Không thể tìm thấy tài nguyên hoặc trang.'
  }



  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  )
};

export default ErrorPage;