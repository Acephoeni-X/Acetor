import { useRouter } from "next/router";
import SearchBody from "../../components/SearchBody";

const Query = () => {
  const router = useRouter();
  const queryParam = router.query.query;
  const query = Array.isArray(queryParam) ? queryParam[0] : queryParam || "";

  return <SearchBody query={query} />;
};

export default Query;
