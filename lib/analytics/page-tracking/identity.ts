import { AUTH_API, BEARER_COOKIE, OWN_ID_KEY, PROFILE_API, PROFILE_KEY, SITE_COOKIE } from "./page-tracking.constants";
import type { ConsentWindow, Identity, Profile } from "./page-tracking.types";

function cookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  for (const part of document.cookie.split(";")) {
    const eq = part.indexOf("=");
    if (eq < 0) continue;
    if (part.slice(0, eq).trim() === name) return part.slice(eq + 1);
  }
  return undefined;
}

const str = (value: unknown): string | undefined =>
  typeof value === "string" && value ? value : undefined;

/** Reuses the site's Mixpanel identity so these events join the same profile. */
function siteIdentity(): Identity | undefined {
  const raw = cookie(SITE_COOKIE);
  if (!raw) return undefined;

  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(raw.replace(/\+/g, " ")));
    if (!parsed || typeof parsed !== "object") return undefined;
    const fields = parsed as Record<string, unknown>;

    const distinctId = str(fields.distinct_id);
    if (!distinctId) return undefined;

    return {
      distinctId,
      deviceId: str(fields.$device_id),
      userId: str(fields.$user_id),
      source: "site",
    };
  } catch {
    return undefined;
  }
}

function ownIdentity(): Identity {
  try {
    const found = localStorage.getItem(OWN_ID_KEY);
    if (found) return { distinctId: found, deviceId: found, source: "own" };
    const made = crypto.randomUUID();
    localStorage.setItem(OWN_ID_KEY, made);
    return { distinctId: made, deviceId: made, source: "own" };
  } catch {
    return { distinctId: "anon", source: "own" };
  }
}

let current: Identity | undefined;

export function identity(): Identity {
  current ??= siteIdentity() ?? ownIdentity();
  return current;
}

/** Cookiebot statistics consent; the site's Mixpanel cookie only exists once that consent was given. */
function mayIdentify(): boolean {
  const consent = (window as unknown as ConsentWindow).Cookiebot?.consent;
  if (consent && typeof consent.statistics === "boolean") return consent.statistics;
  return Boolean(cookie(SITE_COOKIE));
}

function bearerToken(): string | undefined {
  const raw = cookie(BEARER_COOKIE);
  if (!raw) return undefined;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

let pending: Promise<Identity> | undefined;

/**
 * Resolves the signed-in account from the imagine.art bearer cookie.
 * Read-only on purpose: refreshing here would burn the single-use refresh token and sign the user out.
 */
export function resolveAccount(): Promise<Identity> {
  pending ??= lookUpAccount().then((who) => {
    if (!who.userId) pending = undefined;
    return who;
  });
  return pending;
}

async function lookUpAccount(): Promise<Identity> {
  const known = identity();
  if (known.userId) return known;
  if (typeof window === "undefined" || !mayIdentify()) return known;

  const bearer = bearerToken();
  if (!bearer) return known;

  try {
    const response = await fetch(`${AUTH_API}/user/@me`, {
      headers: { Accept: "application/json", Authorization: `Bearer ${bearer}` },
      cache: "no-store",
    });
    if (!response.ok) return known;

    const body: unknown = await response.json();
    const id = str((body as { result?: { id?: unknown } } | null)?.result?.id);
    if (!id) return known;

    current = {
      distinctId: id,
      deviceId: known.deviceId ?? known.distinctId,
      userId: id,
      source: "account",
    };
    return current;
  } catch {
    return known;
  }
}

let currentProfile: Profile | undefined;
let profilePending: Promise<Profile | undefined> | undefined;

export function profile(): Profile | undefined {
  if (currentProfile) return currentProfile;
  if (typeof sessionStorage === "undefined") return undefined;
  try {
    const raw = sessionStorage.getItem(PROFILE_KEY);
    if (!raw) return undefined;
    const held = JSON.parse(raw) as Profile;
    currentProfile = held.userId && held.userId === identity().userId ? held : undefined;
    if (!currentProfile) sessionStorage.removeItem(PROFILE_KEY);
    return currentProfile;
  } catch {
    return undefined;
  }
}

export function resolveProfile(): Promise<Profile | undefined> {
  profilePending ??= loadProfile().then((p) => {
    if (!p) profilePending = undefined;
    return p;
  });
  return profilePending;
}

async function loadProfile(): Promise<Profile | undefined> {
  const who = await resolveAccount();
  if (!who.userId) return undefined;

  const held = profile();
  if (held) return held;

  const bearer = bearerToken();
  if (!bearer) return undefined;

  try {
    const response = await fetch(PROFILE_API, {
      headers: { Accept: "application/json", Authorization: `Bearer ${bearer}` },
      cache: "no-store",
    });
    if (!response.ok) return undefined;

    const body = (await response.json()) as { profile?: Record<string, unknown> } | null;
    const fields = body?.profile;
    if (!fields) return undefined;

    const found: Profile = {
      userId: str(fields.user_id) ?? who.userId,
      name: str(fields.name),
      username: str(fields.username),
      email: str(fields.email),
      imageKey: str(fields.profile_image_key),
    };

    currentProfile = found;
    try {
      sessionStorage.setItem(PROFILE_KEY, JSON.stringify(found));
    } catch {}
    return found;
  } catch {
    return undefined;
  }
}
