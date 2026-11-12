import { ASSET_CDN_BASE_URL } from "./assets.constants";
import { PREVIEW_ASSET_PATHS } from "./preview-assets.constants";

export function resolveAssetUrl(path: string): string {
  if (path.startsWith("https://")) return path;

  const normalizedPath = path.replace(/^\/+/, "");
  const pathSegments = normalizedPath.split("/");

  if (!normalizedPath || pathSegments.some((segment) => !segment || segment === "." || segment === "..") || normalizedPath.includes("\\")) {
    throw new Error(`Invalid asset path: ${path}`);
  }

  const encodedPath = pathSegments.map(encodeURIComponent).join("/");
  if (PREVIEW_ASSET_PATHS.has(normalizedPath)) return `/preview-assets/${encodedPath}`;
  return `${ASSET_CDN_BASE_URL}/${encodedPath}`;
}
