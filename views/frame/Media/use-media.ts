"use client";

import { useEffect, useRef } from "react";
import { NEAR_MARGIN, VISIBLE_MARGIN } from "../lazy.constants";
import { useInView } from "../use-in-view";

export function useMedia(active: boolean, muted: boolean) {
  const video = useRef<HTMLVideoElement>(null);
  const near = useInView(video, NEAR_MARGIN, true);
  const visible = useInView(video, VISIBLE_MARGIN);

  useEffect(() => {
    const v = video.current;
    if (!v || !near) return;
    v.muted = muted || !active;
    if (active && visible) void v.play().catch(() => undefined);
    else v.pause();
  }, [active, muted, near, visible]);

  return { video, near };
}
