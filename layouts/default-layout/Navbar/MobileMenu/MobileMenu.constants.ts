import { NAVBAR_ITEMS } from "../Navbar.constants";
import type { NavGroup, NavPanel } from "../Navbar.types";

function toMobileGroups(panel: NavPanel): NavGroup[] {
  const groups = panel.columns.flatMap((column) => column.groups).reduce<NavGroup[]>((merged, group) => {
    const previous = merged[merged.length - 1];
    if (group.headingHidden && previous) {
      merged[merged.length - 1] = { ...previous, items: [...(previous.items ?? []), ...(group.items ?? [])], links: [...(previous.links ?? []), ...(group.links ?? [])] };
      return merged;
    }
    return [...merged, group];
  }, []);
  if (panel.bar) groups.push({ heading: "Everywhere you create", links: panel.bar.links.filter((link) => link.href).map((link) => ({ label: link.label, href: link.href! })) });
  if (panel.stories) groups.push({ heading: panel.stories.heading, items: panel.stories.items.map((story) => ({ title: story.company, description: story.result, href: story.href })) });
  return groups;
}

export const MOBILE_PANEL_GROUPS: Record<string, NavGroup[]> = Object.fromEntries(
  NAVBAR_ITEMS.filter((entry) => entry.panel).map((entry) => [entry.label, toMobileGroups(entry.panel!)]),
);
