import type { SVGProps } from "react";

export function Clock(props: SVGProps<SVGSVGElement>) {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" {...props}><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" /><path d="M6 3.5V6.5L7.5 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>;
}
