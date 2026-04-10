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
  let parsed;
  if (!res.ok) {
    const text = await res.text();

    // Try a fallback proxy if the upstream blocks the Vercel IP.
    const isBlockedSource = url.includes("apibay.org") && [403, 429, 503].includes(res.status);
    if (isBlockedSource) {
      try {
        const fallbackUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
        const proxyRes = await fetch(fallbackUrl, {
          headers: {
            ...DEFAULT_HEADERS,
            ...headers,
          },
        });

        if (proxyRes.ok) {
          const fallbackContentType = (proxyRes.headers.get("content-type") || "").toLowerCase();
          if (fallbackContentType.includes("application/json")) {
            parsed = await proxyRes.json();
          } else {
            const fallbackText = await proxyRes.text();
            parsed = JSON.parse(fallbackText);
          }
          cache.set(url, parsed, ttl);
          return parsed;
        }
      } catch (fallbackError) {
        console.warn(`Fallback proxy failed for ${url}:`, fallbackError);
      }
    }

    // Cloudflare/JS challenge pages return HTML, not JSON.
    // Returning null lets callers decide how to handle rate limits/blocking.
    if (text.trim().startsWith("<")) {
      console.warn(`Fetch returned non-JSON (status ${res.status}) for ${url}`);
      return null;
    }

    // If we got a JSON error payload, return it so callers can inspect it.
    try {
      parsed = JSON.parse(text);
      cache.set(url, parsed, ttl);
      return parsed;
    } catch {
      console.warn(`Fetch returned non-JSON error response (status ${res.status}) for ${url}`);
      return null;
    }
  }

  if (contentType.includes("application/json")) {
    parsed = await res.json();
  } else {
    parsed = await res.text();
  }

  cache.set(url, parsed, ttl);
  return parsed;
}
