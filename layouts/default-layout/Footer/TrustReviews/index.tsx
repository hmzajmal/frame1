import { G2_FULL_STARS, G2_HREF, G2_LOGO_PATHS, G2_RATING, G2_STAR_OUTLINE_PATH, G2_STAR_PATH, TRUST_CARD_CLASS, TRUST_CENTER_HREF, TRUSTPILOT_HREF, TRUSTPILOT_STAR_PATH } from "./TrustReviews.constants";

export function TrustReviews() {
  return (
    <div className="mt-6 flex flex-col items-start gap-3">
      <a href={TRUSTPILOT_HREF} target="_blank" rel="noopener noreferrer" aria-label="Read our reviews on Trustpilot" className={TRUST_CARD_CLASS}>
        <span className="flex flex-1 items-center justify-start gap-2 pl-2 pr-3">
          <span className="flex size-[30px] flex-none items-center justify-center"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="size-[26px] text-[#00b67a]"><path d={TRUSTPILOT_STAR_PATH} fill="currentColor" /></svg></span>
          <span className="flex flex-col items-start gap-1">
            <span className="text-[11px] leading-none font-semibold text-white">Trustpilot</span>
            <span className="text-[9px] leading-none text-white/50">Read our reviews</span>
          </span>
        </span>
      </a>
      <a href={G2_HREF} target="_blank" rel="noopener noreferrer" aria-label={`Rated ${G2_RATING} on G2, read our reviews`} className={TRUST_CARD_CLASS}>
        <span className="flex flex-1 items-stretch">
          <span className="flex min-w-0 flex-1 items-center justify-start gap-1 pl-2">
            <span className="text-[13px] font-semibold text-white">{G2_RATING}</span>
            <span className="flex flex-col items-center gap-0.5">
              <span className="flex items-center gap-0.5">
                {G2_FULL_STARS.map((star) => (
                  <svg key={star} width="27" height="26" viewBox="0 0 27 26" fill="none" aria-hidden="true" className="size-2.5 text-[#FF3A22]"><path fillRule="evenodd" clipRule="evenodd" d={G2_STAR_PATH} fill="currentColor" /></svg>
                ))}
                <span className="relative size-2.5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-2.5 text-[#FF3A22]"><path d={G2_STAR_OUTLINE_PATH} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span className="absolute inset-y-0 left-0 w-2/5 overflow-hidden">
                    <svg width="27" height="26" viewBox="0 0 27 26" fill="none" aria-hidden="true" className="size-2.5 p-px text-[#FF3A22]"><path fillRule="evenodd" clipRule="evenodd" d={G2_STAR_PATH} fill="currentColor" /></svg>
                  </span>
                </span>
              </span>
              <span className="text-[5.75px] leading-[5.75px] font-extralight whitespace-nowrap text-white/50">Read our reviews on</span>
            </span>
          </span>
          <span className="flex w-10 flex-none items-center justify-center bg-[#FF3A22] pl-3 [clip-path:polygon(0_0,100%_0,100%_100%,0_100%,12px_50%)]">
            <svg width="31" height="32" viewBox="0 0 31 32" fill="none" aria-hidden="true" className="size-6 text-white">
              {G2_LOGO_PATHS.map((d) => <path key={d.slice(0, 12)} d={d} fill="currentColor" />)}
            </svg>
          </span>
        </span>
      </a>
      <a href={TRUST_CENTER_HREF} target="_blank" rel="noopener noreferrer" aria-label="SOC 2 Type II audited, view our Trust Center" className={TRUST_CARD_CLASS}>
        <span className="flex flex-1 items-center justify-start gap-2 pl-2 pr-3">
          <svg width="30" height="30" viewBox="0 0 140 140" aria-hidden="true" className="size-[30px] flex-none">
            <defs>
              <linearGradient id="tr-soc2-ring" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#14b4e9" />
                <stop offset="1" stopColor="#2160ad" />
              </linearGradient>
              <linearGradient id="tr-soc2-disc" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#2160ad" />
                <stop offset="1" stopColor="#14b4e9" />
              </linearGradient>
              <path id="tr-soc2-arc" d="M 9 70 A 61 61 0 0 0 131 70" />
            </defs>
            <circle cx="70" cy="70" r="68" fill="url(#tr-soc2-ring)" />
            <circle cx="70" cy="70" r="53" fill="url(#tr-soc2-disc)" />
            <line x1="38" y1="71" x2="102" y2="71" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="1.2" />
            <g fill="#ffffff" textAnchor="middle" fontWeight="500">
              <text x="70" y="63" fontSize="23">SOC 2</text>
              <text x="70" y="93" fontSize="18" letterSpacing="0.6">TYPE II</text>
            </g>
            <text fontSize="6.6" fill="#ffffff" letterSpacing="0.2">
              <textPath href="#tr-soc2-arc" startOffset="50%" textAnchor="middle">System and Organization Controls</textPath>
            </text>
          </svg>
          <span className="flex flex-col items-start gap-0.5">
            <span className="text-[11px] leading-none font-semibold text-white">SOC 2 Type II</span>
            <span className="text-[9px] leading-none text-white/50">Audited</span>
          </span>
        </span>
      </a>
      <a href={TRUST_CENTER_HREF} target="_blank" rel="noopener noreferrer" aria-label="GDPR compliant, view our Trust Center" className={TRUST_CARD_CLASS}>
        <span className="flex flex-1 items-center justify-start gap-2 pl-2 pr-3">
          <svg width="30" height="30" viewBox="0 0 140 140" aria-hidden="true" className="size-[30px] flex-none">
            <defs>
              <linearGradient id="tr-gdpr-ring" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#7a73d8" />
                <stop offset="1" stopColor="#4a45a8" />
              </linearGradient>
              <linearGradient id="tr-gdpr-disc" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#4a45a8" />
                <stop offset="1" stopColor="#7a73d8" />
              </linearGradient>
              <path id="tr-gdpr-arc" d="M 9 70 A 61 61 0 0 0 131 70" />
            </defs>
            <circle cx="70" cy="70" r="68" fill="url(#tr-gdpr-ring)" />
            <circle cx="70" cy="70" r="53" fill="url(#tr-gdpr-disc)" />
            <line x1="38" y1="71" x2="102" y2="71" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="1.2" />
            <g fill="#ffffff" textAnchor="middle" fontWeight="500">
              <text x="70" y="63" fontSize="23">GDPR</text>
              <text x="70" y="93" fontSize="19">2016/679</text>
            </g>
            <text fontSize="7" fill="#ffffff" letterSpacing="0.2">
              <textPath href="#tr-gdpr-arc" startOffset="50%" textAnchor="middle">General Data Protection Regulation</textPath>
            </text>
          </svg>
          <span className="flex flex-col items-start gap-0.5">
            <span className="text-[11px] leading-none font-semibold text-white">GDPR</span>
            <span className="text-[9px] leading-none text-white/50">Compliant</span>
          </span>
        </span>
      </a>
    </div>
  );
}
