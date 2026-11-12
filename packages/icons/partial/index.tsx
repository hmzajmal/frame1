import type { SVGProps } from "react";

export function Partial(props: SVGProps<SVGSVGElement>) {
  return <svg width="15" height="15" viewBox="0 0 15 15" aria-hidden="true" {...props}><circle cx="7.5" cy="7.5" r="6" fill="none" stroke="rgba(0,0,0,0.34)" strokeWidth="1.2" /><path d="M7.5 1.5 A6 6 0 0 0 7.5 13.5 Z" fill="rgba(0,0,0,0.34)" /></svg>;
}
