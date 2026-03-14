import { fetchWithCache } from "../../../services/fetchWithCache";

export default async function handler(req, res) {
  const {
    query: { query },
    method,
  } = req;

  if (method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!query) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_SEARCH}${encodeURIComponent(query)}`;
    const result = await fetchWithCache(url, { ttl: 60 });

    if (!result || !Array.isArray(result)) {
      return res.status(502).json({ error: "Upstream did not return valid results" });
    }

    return res.status(200).json({ data: result });
  } catch (err) {
    console.error("/api/search/[query] error:", err);
    return res.status(502).json({ error: "Unable to fetch search results" });
  }
}
