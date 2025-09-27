import React from 'react';

interface IconProps {
  className?: string;
}

export const MooncakeBoxIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="30" width="80" height="50" rx="5" fill="#8B4513" />
    <rect x="15" y="35" width="70" height="40" rx="3" fill="#D2B48C" />
    <circle cx="30" cy="55" r="10" fill="#F5DEB3" />
    <circle cx="70" cy="55" r="10" fill="#F5DEB3" />
    <path d="M30 50L30 60M25 55L35 55" stroke="#8B4513" strokeWidth="2" />
    <path d="M70 50L70 60M65 55L75 55" stroke="#8B4513" strokeWidth="2" />
    <rect x="20" y="20" width="60" height="10" rx="2" fill="#D4AF37" />
  </svg>
);

export const MoonLampIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="45" r="30" fill="#FFF9C4" />
    <circle cx="40" cy="35" r="5" fill="#FFECB3" />
    <circle cx="60" cy="40" r="8" fill="#FFECB3" />
    <circle cx="45" cy="55" r="6" fill="#FFECB3" />
    <rect x="48" y="75" width="4" height="15" fill="#78909C" />
    <rect x="40" y="90" width="20" height="5" rx="2" fill="#78909C" />
  </svg>
);

export const BunnyPlushIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="60" r="30" fill="#F5F5F5" />
    <circle cx="35" cy="30" r="15" fill="#F5F5F5" />
    <circle cx="65" cy="30" r="15" fill="#F5F5F5" />
    <circle cx="42" cy="55" r="3" fill="#000" />
    <circle cx="58" cy="55" r="3" fill="#000" />
    <ellipse cx="50" cy="65" rx="5" ry="3" fill="#FFCDD2" />
    <path d="M45 45C46.6667 48.3333 53.3333 48.3333 55 45" stroke="#000" strokeWidth="1.5" />
  </svg>
);

export const LanternKitIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 20L60 20L55 30L45 30L40 20Z" fill="#FFA000" />
    <rect x="45" y="30" width="10" height="5" fill="#FFA000" />
    <path d="M35 35H65V75C65 77.7614 62.7614 80 60 80H40C37.2386 80 35 77.7614 35 75V35Z" fill="#FF5722" />
    <path d="M40 45H60M40 55H60M40 65H60" stroke="#FFECB3" strokeWidth="2" />
    <path d="M50 35V80" stroke="#FFECB3" strokeWidth="2" />
  </svg>
);

export const TeaSetIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="70" width="60" height="10" rx="2" fill="#B0BEC5" />
    <path d="M30 50C30 44.4772 34.4772 40 40 40H60C65.5228 40 70 44.4772 70 50V70H30V50Z" fill="#ECEFF1" />
    <path d="M40 40V35C40 32.2386 42.2386 30 45 30H55C57.7614 30 60 32.2386 60 35V40" stroke="#ECEFF1" strokeWidth="3" />
    <circle cx="40" cy="55" r="3" fill="#B0BEC5" />
    <circle cx="50" cy="55" r="3" fill="#B0BEC5" />
    <circle cx="60" cy="55" r="3" fill="#B0BEC5" />
    <path d="M35 70L40 60M65 70L60 60" stroke="#B0BEC5" strokeWidth="2" />
  </svg>
);

export const VoucherIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="30" width="70" height="40" rx="2" fill="#FFECB3" />
    <rect x="20" y="35" width="60" height="30" rx="1" stroke="#FFA000" strokeWidth="2" strokeDasharray="4 4" />
    <path d="M30 50H70" stroke="#FFA000" strokeWidth="2" />
    <path d="M40 42H60" stroke="#FFA000" strokeWidth="2" />
    <path d="M40 58H60" stroke="#FFA000" strokeWidth="2" />
  </svg>
);

export const JadePendantIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="25" fill="#81C784" />
    <path d="M40 40C45 35 55 35 60 40C65 45 65 55 60 60C55 65 45 65 40 60C35 55 35 45 40 40Z" fill="#66BB6A" />
    <circle cx="50" cy="50" r="15" fill="#4CAF50" />
    <path d="M45 45C46.6667 43.3333 53.3333 43.3333 55 45C56.6667 46.6667 56.6667 53.3333 55 55C53.3333 56.6667 46.6667 56.6667 45 55C43.3333 53.3333 43.3333 46.6667 45 45Z" fill="#81C784" />
    <rect x="48" y="15" width="4" height="10" fill="#A1887F" />
    <circle cx="50" cy="25" r="3" fill="#D4AF37" />
  </svg>
);

export const StarProjectorIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="60" r="25" fill="#455A64" />
    <path d="M35 60L65 60" stroke="#90A4AE" strokeWidth="2" />
    <path d="M50 45L50 75" stroke="#90A4AE" strokeWidth="2" />
    <circle cx="50" cy="60" r="10" fill="#90A4AE" />
    <circle cx="50" cy="60" r="5" fill="#CFD8DC" />
    <path d="M30 40L35 35M70 40L65 35M30 80L35 85M70 80L65 85" stroke="#FFECB3" strokeWidth="2" />
    <circle cx="25" cy="30" r="2" fill="#FFECB3" />
    <circle cx="75" cy="35" r="2" fill="#FFECB3" />
    <circle cx="30" cy="85" r="2" fill="#FFECB3" />
    <circle cx="70" cy="90" r="2" fill="#FFECB3" />
  </svg>
);

export const ToteBagIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 40H70V80C70 82.7614 67.7614 85 65 85H35C32.2386 85 30 82.7614 30 80V40Z" fill="#ECEFF1" />
    <path d="M30 40L35 30C35 25.5817 38.5817 22 43 22H57C61.4183 22 65 25.5817 65 30L70 40" stroke="#B0BEC5" strokeWidth="2" />
    <circle cx="40" cy="55" r="5" fill="#FFA000" />
    <circle cx="60" cy="55" r="5" fill="#FFA000" />
    <path d="M45 65H55" stroke="#FFA000" strokeWidth="2" />
  </svg>
);

export const getIconByName = (name: string, className?: string) => {
  switch (name) {
    case '/assets/mooncake-box.png':
      return <MooncakeBoxIcon className={className} />;
    case '/assets/moon-lamp.png':
      return <MoonLampIcon className={className} />;
    case '/assets/bunny-plush.png':
      return <BunnyPlushIcon className={className} />;
    case '/assets/lantern-kit.png':
      return <LanternKitIcon className={className} />;
    case '/assets/tea-set.png':
      return <TeaSetIcon className={className} />;
    case '/assets/voucher.png':
      return <VoucherIcon className={className} />;
    case '/assets/jade-pendant.png':
      return <JadePendantIcon className={className} />;
    case '/assets/star-projector.png':
      return <StarProjectorIcon className={className} />;
    case '/assets/tote-bag.png':
      return <ToteBagIcon className={className} />;
    default:
      return <div className={`${className} bg-gray-200 flex items-center justify-center`}>?</div>;
  }
};
