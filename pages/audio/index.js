import { useEffect } from "react";
import Body from "../../components/Body";

export default function Home() {
  useEffect(() => {
    fetch("/api/revalidate/audio");
  }, []);
  return <Body data={[]} query="audio" />;
}
