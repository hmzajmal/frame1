"use client";

import { useEffect, useRef } from "react";
import { NEAR_MARGIN, VISIBLE_MARGIN } from "../lazy.constants";
import { useInView } from "../use-in-view";

export function usePhoneToAvatar(muted: boolean) {
  const root = useRef<HTMLElement>(null);
  const selfie = useRef<HTMLVideoElement>(null);
  const avatar = useRef<HTMLVideoElement>(null);
  const near = useInView(root, NEAR_MARGIN, true);
  const visible = useInView(root, VISIBLE_MARGIN);

  useEffect(() => {
    if (!near) return;
    if (avatar.current) avatar.current.muted = muted;
    if (selfie.current) selfie.current.muted = true;
    for (const v of [selfie.current, avatar.current]) {
      if (!v) continue;
      if (visible) void v.play().catch(() => undefined);
      else v.pause();
    }
  }, [near, visible, muted]);

  return { root, selfie, avatar, near };
}
