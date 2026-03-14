import NodeCache from "node-cache";

// In a serverless environment this cache may persist across warm invocations,
// reducing the number of outbound requests and avoiding rate limits.
const cache = new NodeCache({ stdTTL: 120, checkperiod: 60 });

// Use a browser-like User-Agent to avoid simple bot/rate-limit filtering.
const DEFAULT_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "application/json, text/plain, */*",
};

/**
 * Fetch a URL with caching and sane defaults.
 * Returns parsed JSON if response is JSON, otherwise returns raw text.
 */
export async function fetchWithCache(url, options = {}) {
  const { ttl = 120, force = false, headers = {} } = options;

  if (!force) {
    const cached = cache.get(url);
    if (cached !== undefined) {
      return cached;
    }
  }

  const res = await fetch(url, {
    ...options,
    headers: {
      ...DEFAULT_HEADERS,
      ...headers,
    },
  });

  const contentType = (res.headers.get("content-type") || "").toLowerCase();
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Fetch failed (${res.status}) ${url}: ${text}`);
  }

  let parsed;
  if (contentType.includes("application/json")) {
    parsed = await res.json();
  } else {
    parsed = await res.text();
  }

  cache.set(url, parsed, ttl);
  return parsed;
}
