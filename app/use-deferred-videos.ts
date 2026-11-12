"use client";

import { useEffect } from "react";
import { DEFERRED_VIDEO_SELECTOR } from "./use-deferred-videos.constants";

export function useDeferredVideos() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (!entry.isIntersecting) {
            video.pause();
            return;
          }

          if (!video.src && video.dataset.deferredSrc) {
            video.src = video.dataset.deferredSrc;
          }
          video.play().catch(() => {});
        });
      },
      { rootMargin: "300px 0px" },
    );
    const observed = new Set<HTMLVideoElement>();
    const observeVideo = (video: HTMLVideoElement) => {
      if (observed.has(video)) return;
      observed.add(video);
      observer.observe(video);
    };
    const observeVideos = (root: ParentNode) => {
      root.querySelectorAll<HTMLVideoElement>(DEFERRED_VIDEO_SELECTOR).forEach(observeVideo);
    };

    observeVideos(document);
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(DEFERRED_VIDEO_SELECTOR)) {
            observeVideo(node as HTMLVideoElement);
            return;
          }
          observeVideos(node);
        });
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);
}
