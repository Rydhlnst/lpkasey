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
  const mainColor = color ?? "#38BDF8";
  const detailColor = strokeColor ?? "#0070B8";
  const gradientId = useId().replace(/:/g, "");
  const bodySheenId = `pillar-body-sheen-${gradientId}`;
  const capSheenId = `pillar-cap-sheen-${gradientId}`;
  const baseSheenId = `pillar-base-sheen-${gradientId}`;
  const dropShadowId = `pillar-shadow-${gradientId}`;

  return (
    <svg
      viewBox="0 0 3875 5993"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={bodySheenId} x1="917.242" y1="1127.77" x2="2957.24" y2="5287.77" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.28" />
          <stop offset="0.18" stopColor="#FFFFFF" stopOpacity="0.1" />
          <stop offset="0.52" stopColor="#000000" stopOpacity="0.06" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id={capSheenId} x1="1937.25" y1="0" x2="1937.25" y2="1200" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.32" />
          <stop offset="0.38" stopColor="#FFFFFF" stopOpacity="0.1" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id={baseSheenId} x1="257.242" y1="5352.17" x2="3617.24" y2="5992.17" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.26" />
          <stop offset="0.34" stopColor="#FFFFFF" stopOpacity="0.08" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.2" />
        </linearGradient>
        <filter id={dropShadowId} x="-8%" y="-4%" width="116%" height="112%">
          <feDropShadow dx="0" dy="34" stdDeviation="26" floodColor="#000000" floodOpacity="0.16" />
        </filter>
      </defs>
      <g filter={`url(#${dropShadowId})`}>
        <rect x="917.242" y="1127.77" width="2040" height="4160" fill={mainColor} stroke={detailColor} strokeWidth="80" />
        <rect x="917.242" y="1127.77" width="2040" height="4160" fill={`url(#${bodySheenId})`} />
        <rect x="1007.24" y="1187.77" width="160" height="4040" fill="#FFFFFF" opacity="0.14" />
        <rect x="2737.24" y="1187.77" width="120" height="4040" fill="#000000" opacity="0.1" />
        <rect x="497.242" y="5352.17" width="2880" height="240" fill={mainColor} stroke={detailColor} strokeWidth="60" />
        <rect x="497.242" y="5352.17" width="2880" height="240" fill={`url(#${baseSheenId})`} />
        <rect x="257.242" y="5672.17" width="3360" height="320" rx="18" fill={mainColor} stroke={detailColor} strokeWidth="60" />
        <rect x="257.242" y="5672.17" width="3360" height="320" rx="18" fill={`url(#${baseSheenId})`} />
        <rect x="917.249" width="2040" height="120" fill={mainColor} stroke={detailColor} strokeWidth="60" />
        <rect x="917.249" width="2040" height="1200" fill={`url(#${capSheenId})`} opacity="0.95" />
      </g>
      <line x1="897.249" y1="523.037" x2="2977.25" y2="523.037" stroke={detailColor} strokeWidth="80" />
      <line x1="897.249" y1="1006.36" x2="2977.25" y2="1006.36" stroke={detailColor} strokeWidth="80" />
      <line x1="737.249" y1="221.698" x2="3137.25" y2="221.698" stroke={detailColor} strokeWidth="80" strokeLinecap="round" />
      <path
        d="M494.042 783.146C459.618 718.598 438.102 472.196 737.472 472.197C979.783 492.968 1022.73 735.04 960.041 914.193C897.348 1093.35 696.053 1185.92 510.438 1120.97C441.464 1096.83 384.36 1054.33 343.047 1001.27"
        fill="none"
        stroke={detailColor}
        strokeWidth="80"
        strokeLinecap="round"
      />
      <path
        d="M3380.44 783.146C3414.87 718.598 3436.38 472.196 3137.01 472.197C2894.7 492.968 2851.75 735.04 2914.44 914.193C2977.14 1093.35 3178.43 1185.92 3364.05 1120.97C3433.02 1096.83 3490.12 1054.33 3531.44 1001.27"
        fill="none"
        stroke={detailColor}
        strokeWidth="80"
        strokeLinecap="round"
      />
      <path
        d="M728.009 222.02C604.051 225.265 430.712 212.292 328.089 319.96C203.624 450.547 144.45 787.218 356.921 1018.71"
        fill="none"
        stroke={detailColor}
        strokeWidth="80"
        strokeLinecap="round"
      />
      <path
        d="M3146.48 222.02C3270.43 225.265 3443.77 212.292 3546.4 319.96C3670.86 450.547 3730.04 787.218 3517.56 1018.71"
        fill="none"
        stroke={detailColor}
        strokeWidth="80"
        strokeLinecap="round"
      />
      <line x1="1142.2" y1="1046.36" x2="1142.2" y2="526.362" stroke={detailColor} strokeWidth="60" />
      <line x1="1462.2" y1="1046.36" x2="1462.2" y2="526.362" stroke={detailColor} strokeWidth="60" />
      <line x1="1782.2" y1="1046.36" x2="1782.2" y2="526.362" stroke={detailColor} strokeWidth="60" />
      <line x1="2102.2" y1="1046.36" x2="2102.2" y2="526.362" stroke={detailColor} strokeWidth="60" />
      <line x1="2422.2" y1="1046.36" x2="2422.2" y2="526.362" stroke={detailColor} strokeWidth="60" />
      <line x1="2742.2" y1="1046.36" x2="2742.2" y2="526.362" stroke={detailColor} strokeWidth="60" />
    </svg>
  );
};

export default PillarSvg;
