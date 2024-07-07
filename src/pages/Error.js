import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

function Error() {
  const error = useRouteError();

  let title = "an error occured!";
  let message = "Something went wrong!";
  if (error.status === 500) {
    //parsing done by react router when handed over to Events throw statement
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not Found!";
    message = "Could not find Resourse!";
  }
  return (
    <>
    <MainNavigation/>
    <PageContent title={title}>
      <p>{message}</p>
    </PageContent>
    </>
  );
}

export default Error;
