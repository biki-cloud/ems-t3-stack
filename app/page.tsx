import { eventPerPage as eventPerPage } from "@/lib/utils";
import EventList from "@/components/event/EventList";

interface HomeProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

const Home = async ({ searchParams }: HomeProps) => {
  const { page, perPage } = searchParams;

  const limit = typeof perPage === "string" ? parseInt(perPage) : eventPerPage;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;

  return <EventList limit={limit} offset={offset} />;
};

export default Home;
