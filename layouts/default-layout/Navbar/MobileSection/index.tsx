import { Chevron } from "../Chevron";

export function MobileSection({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-black/8">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between border-0 bg-transparent px-1 py-[14px] text-left"
      >
        <span className="font-sans text-[17px] text-black/85">{label}</span>
        <span className="text-black/40">
          <Chevron open={open} />
        </span>
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}
