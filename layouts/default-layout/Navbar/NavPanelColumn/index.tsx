import { linkProps } from "../Navbar.constants";
import type { NavColumn } from "@/views/ai-chat/lib/data/nav";

export function NavPanelColumn({ col, eyebrow }: { col: NavColumn; eyebrow?: boolean }) {
  return (
    <div>
      {col.title &&
        (col.headingHref ? (
          <a
            href={col.headingHref}
            className="mb-1 block font-sans text-[13px] font-semibold text-[#171717] no-underline transition-opacity hover:opacity-60"
          >
            {col.title}
          </a>
        ) : (
          <p
            className={eyebrow
              ? "mb-2 font-sans text-[10px] font-semibold tracking-[1.4px] text-[rgba(23,23,23,0.45)] uppercase"
              : "mb-1 block font-sans text-[13px] font-semibold text-[#171717]"}
          >
            {col.title}
          </p>
        ))}
      {col.description && (
        <p className="mb-1 max-w-[260px] font-sans text-[13px] leading-[1.5] text-[rgba(23,23,23,0.55)]">
          {col.description}
        </p>
      )}
      {col.rows.length > 0 && (
        <ul className="m-0 list-none p-0">
          {col.rows.map((row) => (
            <li key={row.name}>
              <a href={row.href} {...linkProps(row.target)} className="group flex items-start gap-2 py-1.5 text-inherit no-underline">
                {row.iconSrc && (
                  <span
                    className="mt-0.5 shrink-0 text-[rgba(23,23,23,0.55)] [&_svg]:block [&_svg]:size-4"
                    dangerouslySetInnerHTML={{ __html: row.iconSrc }}
                  />
                )}
                <span>
                  <span className="font-sans text-[13.5px] font-medium text-[#171717] transition-opacity group-hover:opacity-60">
                    {row.name}
                  </span>
                  {row.description && (
                    <span className="mt-0.5 block font-sans text-[12px] leading-[1.45] text-[rgba(23,23,23,0.5)]">
                      {row.description}
                    </span>
                  )}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
