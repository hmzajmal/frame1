import { linkProps } from "../Navbar.constants";
import type { NavRow } from "@/views/ai-chat/lib/data/nav";

export function MobileLink({ row, onNavigate }: { row: NavRow; onNavigate: () => void }) {
  return (
    <a
      href={row.href}
      {...linkProps(row.target)}
      onClick={onNavigate}
      className="flex items-center gap-2 font-sans text-[14.5px] text-black/70 no-underline"
    >
      {row.iconSrc && (
        <span className="block size-4 shrink-0" dangerouslySetInnerHTML={{ __html: row.iconSrc }} />
      )}
      {row.name}
    </a>
  );
}
