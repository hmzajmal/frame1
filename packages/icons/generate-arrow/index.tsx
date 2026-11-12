import type { SVGProps } from "react";

export function GenerateArrow(props: SVGProps<SVGSVGElement>) {
  return <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}><path d="M3.5 8h9M9 4.5 12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
