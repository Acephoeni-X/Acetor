import { fetchWithCache } from "../../../services/fetchWithCache";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  if (method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!id) {
    return res.status(400).json({ error: "Missing id" });
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_INFO}${id}`;
    const result = await fetchWithCache(url, { ttl: 600 });

    if (!result || typeof result !== "object" || Array.isArray(result)) {
      return res.status(502).json({ error: "Upstream did not return valid JSON" });
    }

    return res.status(200).json({ data: result });
  } catch (err) {
    console.error("/api/info/[id] error:", err);
    return res.status(502).json({ error: "Unable to fetch item data" });
  }
}
