import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { NAVBAR_ITEMS } from "./Navbar.constants";
import type { NavbarMode, NavbarPanelPosition } from "./Navbar.types";

export function useNavbar(mode: NavbarMode) {

  const [scrolled, setScrolled] = useState(false);
  const [overDarkHero, setOverDarkHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [openRow, setOpenRow] = useState<string | null>(null);

  const focusPanel = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);
  const openedByHover = useRef(false);
  const [panelPosition, setPanelPosition] = useState<NavbarPanelPosition | null>(null);
  const isMouse = useCallback((event: React.PointerEvent) => event.pointerType === "mouse", []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
      const hero = document.querySelector<HTMLElement>('main > [data-theme="dark"]:first-child');
      setOverDarkHero(!!hero && hero.getBoundingClientRect().bottom > 64);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!openPanel && !menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPanel(null);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openPanel, menuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1080px)");
    const onChange = () => (mediaQuery.matches ? setOpenPanel(null) : setMenuOpen(false));
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!openPanel || !focusPanel.current) return;
    focusPanel.current = false;
    document.querySelector<HTMLElement>("#nav-dropdown a")?.focus();
  }, [openPanel]);

  useLayoutEffect(() => {
    if (!openPanel) return;

    const placePanel = () => {
      const panel = panelRef.current;
      if (!panel) return;
      const panelWidth = panel.offsetWidth;
      const viewportWidth = document.documentElement.clientWidth;
      setPanelPosition({
        label: openPanel,
        left: Math.round(Math.max(16, (viewportWidth - panelWidth) / 2)),
      });
    };

    placePanel();
    window.addEventListener("resize", placePanel);
    return () => window.removeEventListener("resize", placePanel);
  }, [openPanel]);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  const closeAll = useCallback(() => {
    setOpenPanel(null);
    setMenuOpen(false);
  }, []);

  const hoverOpen = useCallback((label: string) => (event: React.PointerEvent) => {
    if (!isMouse(event)) return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => {
      openedByHover.current = true;
      setOpenPanel(label);
    }, openPanel ? 0 : 90);
  }, [isMouse, openPanel]);

  const hoverClose = useCallback((event: React.PointerEvent) => {
    if (!isMouse(event)) return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpenPanel(null), 180);
  }, [isMouse]);

  const hoverKeep = useCallback((event: React.PointerEvent) => {
    if (isMouse(event)) window.clearTimeout(hoverTimer.current);
  }, [isMouse]);

  const togglePanel = useCallback((label: string, isKeyboard: boolean) => {
    window.clearTimeout(hoverTimer.current);
    focusPanel.current = isKeyboard;
    if (openedByHover.current && openPanel === label) {
      openedByHover.current = false;
      return;
    }
    openedByHover.current = false;
    setOpenPanel((current) => current === label ? null : label);
  }, [openPanel]);

  return {
    mode,
    scrolled,
    overDarkHero,
    menuOpen,
    setMenuOpen,
    openPanel,
    setOpenPanel,
    openRow,
    setOpenRow,
    closeAll,
    hoverOpen,
    hoverClose,
    hoverKeep,
    togglePanel,
    panelRef,
    panelPosition,
    panelEntry: NAVBAR_ITEMS.find((entry) => entry.label === openPanel && entry.panel),
  };
}
