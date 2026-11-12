import { imagineTags } from "../analytics.constants";

/** Max wait for the account lookup before the page view is sent without it. */
export const IDENTITY_WAIT_MS = 1500;

export const SEARCH_DEBOUNCE_MS = 900;

export const LABEL_MAX_LENGTH = 60;

export const HOME_PAGE_KEY = "home";

export const PAGE_KEY_ALIASES: Record<string, string> = {
  "mcp/cli": "mcp",
};

export const BUTTON_SELECTOR = "button, [role='button'], summary";

export const AREA_SELECTOR = "header, nav, footer, aside, dialog";

/** Written by the site's own Mixpanel library (via GTM) on imagine.art. */
export const SITE_COOKIE = `mp_${imagineTags.mixpanelToken}_mixpanel`;

/** Must match `AUTH_COOKIE_KEYS` in `@repo/auth`. */
export const BEARER_COOKIE = "token";

export const AUTH_API = "https://auth.vyro.ai/apis/v1";

export const PROFILE_API = "https://imagine.vyro.ai/v1/user/profile";

/** sessionStorage, so a name and email never outlive the tab on a shared machine. */
export const PROFILE_KEY = "landing_lp_profile";

export const OWN_ID_KEY = "landing_lp_did";
