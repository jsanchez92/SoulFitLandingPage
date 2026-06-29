const API_URL = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

function browser() { const ua = navigator.userAgent; if (ua.includes("Edg/")) return "Edge"; if (ua.includes("Chrome/")) return "Chrome"; if (ua.includes("Firefox/")) return "Firefox"; if (ua.includes("Safari/")) return "Safari"; return "Unknown"; }
function os() { const ua = navigator.userAgent; if (ua.includes("Windows")) return "Windows"; if (ua.includes("Android")) return "Android"; if (/iPhone|iPad/.test(ua)) return "iOS"; if (ua.includes("Mac OS")) return "macOS"; if (ua.includes("Linux")) return "Linux"; return "Unknown"; }
function device() { const ua = navigator.userAgent; return /iPad|Tablet/i.test(ua) ? "tablet" : /Mobile|Android|iPhone/i.test(ua) ? "mobile" : "desktop"; }

export async function reportWebsiteVisit() {
  if (import.meta.env.VITE_WEBSITE_VISITS_ENABLED === "false") return;
  const route = `${location.pathname}${location.search}`;
  const key = `soulfit:website-visit:${route}`;
  if (sessionStorage.getItem(key)) return;
  sessionStorage.setItem(key, "pending");
  try {
    const response = await fetch(`${API_URL}/public/website-visits`, {
      method: "POST", keepalive: true, headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ url: location.href, path: route, referrer: document.referrer || null, client_reported_at: new Date().toISOString(), browser: browser(), os: os(), device_type: device(), screen_width: screen.width, screen_height: screen.height, language: navigator.language })
    });
    if (!response.ok) sessionStorage.removeItem(key); else sessionStorage.setItem(key, "sent");
  } catch { sessionStorage.removeItem(key); }
}

export function installWebsiteVisitTracking() {
  void reportWebsiteVisit();
  const listener = () => void reportWebsiteVisit();
  addEventListener("popstate", listener); addEventListener("hashchange", listener);
  return () => { removeEventListener("popstate", listener); removeEventListener("hashchange", listener); };
}