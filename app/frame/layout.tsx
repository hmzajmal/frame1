import { preconnect, prefetchDNS } from "react-dom";
import "@/views/frame/styles.css";

export default function FrameLayout({ children }: LayoutProps<"/frame">) {
  preconnect("https://www.imagine.art");
  prefetchDNS("https://www.imagine.art");
  preconnect("https://cdn-imagine.vyro.ai");

  return <div className="flex min-h-full flex-col antialiased">{children}</div>;
}
