export default async function handler(req, res) {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: "Missing URL parameter" });
  }

  // Set cache headers to reduce hits to the upstream API
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');

  try {
    const apiRes = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Referer': 'https://apibay.org/',
      },
      // Timeout after 5 seconds
      signal: AbortSignal.timeout(5000)
    });

    if (!apiRes.ok) {
      return res.status(apiRes.status).json({ error: `Upstream returned ${apiRes.status}` });
    }

    const data = await apiRes.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ error: "Proxy failed to reach upstream" });
  }
}
