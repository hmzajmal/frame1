"use client";

import { useEffect } from "react";

export function useClipsSound(sync: (muted: boolean) => void, muted: boolean) {
  useEffect(() => {
    sync(muted);
  }, [sync, muted]);
}
