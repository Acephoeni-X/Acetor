import { useEffect } from "react";
import Body from "../../components/Body";

export default function Home() {
  useEffect(() => {
    fetch("/api/revalidate/games");
  }, []);
  return <Body data={[]} query="games" />;
}
