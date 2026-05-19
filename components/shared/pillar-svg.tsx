import React, { useId } from "react";

type PillarSvgProps = {
  className?: string;
  color?: string;
  strokeColor?: string;
};

export const PillarSvg: React.FC<PillarSvgProps> = ({
  className = "",
  color,
  strokeColor,
}) => {
  const gradientId = useId().replace(/:/g, "");
  const mainColor = color ?? "#06B6D4";
  const detailColor = strokeColor ?? "#0E7490";

  const shadowId = `pillar-shadow-${gradientId}`;
  const bevelHId = `bevel-h-${gradientId}`;
  const bodyShadeId = `body-shade-${gradientId}`;
  const capitalShadeId = `capital-shade-${gradientId}`;
  const slabShadeId = `slab-shade-${gradientId}`;
  const beadShadeId = `bead-shade-${gradientId}`;

  return (
    <svg
      viewBox="0 0 260 520"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block" }}
    >
      <defs>
        <filter id={shadowId} x="-10%" y="-5%" width="120%" height="115%">
          <feDropShadow
            dx="2"
            dy="4"
            stdDeviation="4"
            floodColor="#00000030"
          />
        </filter>

        <linearGradient id={bevelHId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00000018" />
          <stop offset="8%" stopColor="#00000008" />
          <stop offset="50%" stopColor="#ffffff10" />
          <stop offset="92%" stopColor="#00000008" />
          <stop offset="100%" stopColor="#00000018" />
        </linearGradient>

        <linearGradient id={bodyShadeId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00000022" />
          <stop offset="12%" stopColor="#00000008" />
          <stop offset="50%" stopColor="#ffffff0a" />
          <stop offset="88%" stopColor="#00000008" />
          <stop offset="100%" stopColor="#00000022" />
        </linearGradient>

        <linearGradient id={capitalShadeId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff18" />
          <stop offset="60%" stopColor="#00000010" />
          <stop offset="100%" stopColor="#00000025" />
        </linearGradient>

        <linearGradient id={slabShadeId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff22" />
          <stop offset="100%" stopColor="#00000018" />
        </linearGradient>

        <linearGradient id={beadShadeId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff28" />
          <stop offset="50%" stopColor="#00000010" />
          <stop offset="100%" stopColor="#00000022" />
        </linearGradient>
      </defs>

      <g id="top-slab" filter={`url(#${shadowId})`}>
        <rect x="12" y="12" width="236" height="28" rx="3" ry="3" fill={mainColor} />
        <rect x="12" y="12" width="236" height="28" rx="3" ry="3" fill={`url(#${slabShadeId})`} />
        <rect x="12" y="38" width="236" height="2" rx="1" fill={detailColor} opacity="0.35" />

        <rect x="16" y="40" width="228" height="8" rx="2" fill={mainColor} />
        <rect x="16" y="40" width="228" height="8" rx="2" fill={`url(#${beadShadeId})`} />
        <rect x="16" y="47" width="228" height="1.5" rx="0.75" fill={detailColor} opacity="0.25" />

        <rect x="20" y="49" width="220" height="5" rx="1" fill={mainColor} />
        <rect x="20" y="49" width="220" height="5" rx="1" fill={`url(#${capitalShadeId})`} />
      </g>

      <g id="capital">
        <path d="M 18 54 L 242 54 L 200 102 L 60 102 Z" fill={mainColor} />
        <path d="M 18 54 L 242 54 L 200 102 L 60 102 Z" fill={`url(#${capitalShadeId})`} />

        <path
          d="M 68 82 Q 130 74 192 82"
          fill="none"
          stroke={detailColor}
          strokeWidth="1.2"
          opacity="0.5"
        />

        {[80, 94, 108, 122, 136, 150, 164, 178].map((cx, i) => (
          <ellipse
            key={i}
            cx={cx}
            cy={84}
            rx="5.5"
            ry="6.5"
            fill={mainColor}
            stroke={detailColor}
            strokeWidth="0.8"
            opacity="0.85"
          />
        ))}

        {[87, 101, 115, 129, 143, 157, 171].map((cx, i) => (
          <path
            key={i}
            d={`M ${cx} 79 L ${cx} 91`}
            stroke={detailColor}
            strokeWidth="0.7"
            opacity="0.3"
          />
        ))}

        <line x1="64" y1="78" x2="196" y2="78" stroke={detailColor} strokeWidth="1" opacity="0.3" />
        <line x1="64" y1="92" x2="196" y2="92" stroke={detailColor} strokeWidth="1" opacity="0.3" />

        <g id="volute-left">
          <ellipse cx="54" cy="80" rx="38" ry="28" fill={mainColor} />
          <path
            d="M 18 80
               C 18 56, 38 48, 54 54
               C 70 60, 82 72, 76 84
               C 70 96, 52 100, 42 92
               C 32 84, 36 70, 46 66
               C 56 62, 66 68, 64 76
               C 62 84, 52 86, 48 82
               C 44 78, 47 72, 52 72
               C 57 72, 58 77, 56 79"
            fill="none"
            stroke={detailColor}
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.65"
          />
          <circle cx="54" cy="80" r="4.5" fill={mainColor} />
          <circle cx="54" cy="80" r="4.5" fill="none" stroke={detailColor} strokeWidth="1.2" opacity="0.55" />
          <circle cx="54" cy="80" r="2" fill={detailColor} opacity="0.35" />
        </g>

        <g id="volute-right">
          <ellipse cx="206" cy="80" rx="38" ry="28" fill={mainColor} />
          <path
            d="M 242 80
               C 242 56, 222 48, 206 54
               C 190 60, 178 72, 184 84
               C 190 96, 208 100, 218 92
               C 228 84, 224 70, 214 66
               C 204 62, 194 68, 196 76
               C 198 84, 208 86, 212 82
               C 216 78, 213 72, 208 72
               C 203 72, 202 77, 204 79"
            fill="none"
            stroke={detailColor}
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.65"
          />
          <circle cx="206" cy="80" r="4.5" fill={mainColor} />
          <circle cx="206" cy="80" r="4.5" fill="none" stroke={detailColor} strokeWidth="1.2" opacity="0.55" />
          <circle cx="206" cy="80" r="2" fill={detailColor} opacity="0.35" />
        </g>

        <rect x="60" y="99" width="140" height="3" rx="1.5" fill={mainColor} />
        <rect x="60" y="99" width="140" height="3" rx="1.5" fill={detailColor} opacity="0.2" />
      </g>

      <g id="neck-ring">
        <rect x="72" y="102" width="116" height="9" rx="4.5" fill={mainColor} />
        <rect x="72" y="102" width="116" height="9" rx="4.5" fill={`url(#${beadShadeId})`} />
        <rect x="76" y="111" width="108" height="4" rx="2" fill={mainColor} />
        <rect x="76" y="111" width="108" height="4" rx="2" fill={`url(#${capitalShadeId})`} />
        <line x1="76" y1="103" x2="184" y2="103" stroke="#ffffff" strokeWidth="0.8" opacity="0.18" />
      </g>

      <g id="pillar-body" filter={`url(#${shadowId})`}>
        <rect x="78" y="115" width="104" height="393" rx="4" ry="4" fill={mainColor} />
        <rect x="78" y="115" width="104" height="393" rx="4" ry="4" fill={`url(#${bodyShadeId})`} />

        <rect x="78" y="115" width="7" height="393" rx="3.5" fill={mainColor} />
        <rect x="78" y="115" width="7" height="393" rx="3.5" fill="#00000014" />

        <rect x="175" y="115" width="7" height="393" rx="3.5" fill={mainColor} />
        <rect x="175" y="115" width="7" height="393" rx="3.5" fill="#00000014" />

        <rect x="89" y="128" width="82" height="366" rx="3" fill="#00000018" />
        <rect x="91" y="130" width="78" height="362" rx="2.5" fill={mainColor} />
        <rect x="91" y="130" width="78" height="362" rx="2.5" fill={`url(#${bevelHId})`} />
        <line x1="93" y1="131" x2="167" y2="131" stroke="#ffffff" strokeWidth="0.9" opacity="0.2" />
        <line x1="92" y1="131" x2="92" y2="491" stroke="#ffffff" strokeWidth="0.9" opacity="0.15" />
        <line x1="93" y1="491" x2="167" y2="491" stroke={detailColor} strokeWidth="0.9" opacity="0.25" />
        <line x1="168" y1="131" x2="168" y2="491" stroke={detailColor} strokeWidth="0.9" opacity="0.25" />
      </g>

      <g id="base">
        <rect x="76" y="505" width="108" height="6" rx="3" fill={mainColor} />
        <rect x="76" y="505" width="108" height="6" rx="3" fill={`url(#${beadShadeId})`} />
        <rect x="60" y="511" width="140" height="7" rx="2" fill={mainColor} />
        <rect x="60" y="511" width="140" height="7" rx="2" fill={`url(#${slabShadeId})`} />
      </g>
    </svg>
  );
};

export default PillarSvg;
