import React from 'react';

// Cute Cartoon Vector Icons and Mascots with Playful Anime/Kawaii Style

export const CuteArtMascot: React.FC<{ className?: string; mood?: 'happy' | 'excited' | 'wink' }> = ({
  className = 'w-16 h-16',
  mood = 'happy',
}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} filter drop-shadow-md transition-transform hover:scale-110 duration-300`}
  >
    {/* Glow Background */}
    <circle cx="60" cy="60" r="54" fill="#FEF3C7" opacity="0.8" />
    <circle cx="60" cy="60" r="48" fill="#FDE68A" />

    {/* Paint Palette Body */}
    <path
      d="M30 65C25 45 40 25 62 25C84 25 98 40 95 62C92 82 72 95 50 92C38 90 32 82 35 75C37 70 45 70 42 66C39 62 31 70 30 65Z"
      fill="#FBBF24"
      stroke="#B45309"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Color Blobs on Palette */}
    <circle cx="45" cy="40" r="7" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
    <circle cx="65" cy="35" r="7" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2" />
    <circle cx="82" cy="48" r="7" fill="#10B981" stroke="#065F46" strokeWidth="2" />
    <circle cx="80" cy="70" r="6" fill="#EC4899" stroke="#9D174D" strokeWidth="2" />

    {/* Kawaii Face Details */}
    {/* Eyes */}
    {mood === 'wink' ? (
      <>
        <path d="M48 56Q53 50 58 56" stroke="#1E1B4B" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="68" cy="54" r="4" fill="#1E1B4B" />
        <circle cx="70" cy="52" r="1.5" fill="#FFFFFF" />
      </>
    ) : mood === 'excited' ? (
      <>
        <path d="M48 52L56 58L48 62" stroke="#1E1B4B" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M72 52L64 58L72 62" stroke="#1E1B4B" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ) : (
      <>
        <circle cx="50" cy="55" r="4.5" fill="#1E1B4B" />
        <circle cx="52" cy="53" r="1.8" fill="#FFFFFF" />
        <circle cx="68" cy="55" r="4.5" fill="#1E1B4B" />
        <circle cx="70" cy="53" r="1.8" fill="#FFFFFF" />
      </>
    )}

    {/* Rosy Cheeks */}
    <ellipse cx="43" cy="62" rx="4.5" ry="3" fill="#F43F5E" opacity="0.6" />
    <ellipse cx="75" cy="62" rx="4.5" ry="3" fill="#F43F5E" opacity="0.6" />

    {/* Mouth */}
    <path
      d="M54 62Q59 69 64 62"
      stroke="#1E1B4B"
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />

    {/* Paintbrush in Hand */}
    <path
      d="M85 78L102 95C104 97 107 97 109 95C111 93 111 90 109 88L92 71"
      stroke="#78350F"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path d="M85 78L89 74" stroke="#92400E" strokeWidth="6" strokeLinecap="round" />
    <path
      d="M80 73C78 68 83 63 88 67C91 70 85 78 80 73Z"
      fill="#EC4899"
      stroke="#9D174D"
      strokeWidth="2"
    />

    {/* Sparkles around Mascot */}
    <path d="M22 30L25 22L28 30L36 33L28 36L25 44L22 36L14 33L22 30Z" fill="#F59E0B" />
    <path d="M92 20L94 15L96 20L101 22L96 24L94 29L92 24L87 22L92 20Z" fill="#3B82F6" />
  </svg>
);

export const CutePencilMascot: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Body */}
    <path
      d="M30 35L65 10L85 30L50 55L30 35Z"
      fill="#F59E0B"
      stroke="#78350F"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    {/* Eraser */}
    <path
      d="M18 47L30 35L50 55L38 67C33 72 23 72 18 67C13 62 13 52 18 47Z"
      fill="#F43F5E"
      stroke="#881337"
      strokeWidth="3.5"
    />
    <path d="M30 35L38 43L26 55L18 47" fill="#E2E8F0" stroke="#475569" strokeWidth="2" />

    {/* Pencil Tip */}
    <path d="M65 10L85 30L95 12L65 10Z" fill="#FDE68A" stroke="#78350F" strokeWidth="2.5" />
    <path d="M88 18L95 12L89 25L88 18Z" fill="#1E293B" />

    {/* Cute Eyes & Smile */}
    <circle cx="50" cy="30" r="3" fill="#0F172A" />
    <circle cx="62" cy="40" r="3" fill="#0F172A" />
    <path d="M52 38Q57 43 62 36" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <circle cx="47" cy="35" r="2" fill="#FDA4AF" />
    <circle cx="65" cy="44" r="2" fill="#FDA4AF" />
  </svg>
);

export const CuteTrophyBadge: React.FC<{ className?: string; rank?: number }> = ({
  className = 'w-12 h-12',
  rank = 1,
}) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Back Star Glow */}
    <polygon
      points="50,5 63,32 93,36 71,57 77,87 50,72 23,87 29,57 7,36 37,32"
      fill={rank === 1 ? '#FEF08A' : rank === 2 ? '#E2E8F0' : '#FFEDD5'}
      stroke={rank === 1 ? '#F59E0B' : rank === 2 ? '#94A3B8' : '#C2410C'}
      strokeWidth="3"
    />

    {/* Cup Body */}
    <path
      d="M32 25H68V48C68 58 60 66 50 66C40 66 32 58 32 48V25Z"
      fill={rank === 1 ? '#FBBF24' : rank === 2 ? '#CBD5E1' : '#F97316'}
      stroke="#78350F"
      strokeWidth="3.5"
    />
    {/* Handles */}
    <path
      d="M32 30H22C17 30 15 42 24 45H32"
      stroke="#78350F"
      strokeWidth="3.5"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M68 30H78C83 30 85 42 76 45H68"
      stroke="#78350F"
      strokeWidth="3.5"
      fill="none"
      strokeLinecap="round"
    />

    {/* Base Stand */}
    <path d="M44 66H56V76H44V66Z" fill="#B45309" />
    <path d="M30 76H70V86H30V76Z" fill="#78350F" stroke="#451A03" strokeWidth="2.5" rx="3" />

    {/* Cute Face on Trophy */}
    <circle cx="43" cy="40" r="2.5" fill="#1E1B4B" />
    <circle cx="57" cy="40" r="2.5" fill="#1E1B4B" />
    <path d="M46 46Q50 50 54 46" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

export const CuteCrownIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M12 56L8 24L28 38L40 14L52 38L72 24L68 56H12Z"
      fill="#F59E0B"
      stroke="#78350F"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <circle cx="8" cy="22" r="5" fill="#EF4444" stroke="#78350F" strokeWidth="2" />
    <circle cx="40" cy="12" r="6" fill="#3B82F6" stroke="#78350F" strokeWidth="2" />
    <circle cx="72" cy="22" r="5" fill="#10B981" stroke="#78350F" strokeWidth="2" />
    <rect x="16" y="56" width="48" height="10" rx="3" fill="#D97706" stroke="#78350F" strokeWidth="3" />
  </svg>
);

export const CuteSparkleStar: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M30 4L37 22L55 25L41 38L45 56L30 46L15 56L19 38L5 25L23 22L30 4Z"
      fill="#FBBF24"
      stroke="#B45309"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <circle cx="25" cy="28" r="2" fill="#1E1B4B" />
    <circle cx="35" cy="28" r="2" fill="#1E1B4B" />
    <path d="M27 34Q30 37 33 34" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

export const CuteRibbonBadge: React.FC<{ className?: string; label?: string }> = ({
  className = 'w-10 h-10',
  label = '100%',
}) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Ribbon Tails */}
    <path d="M25 45L12 70L30 62L40 70L35 45" fill="#E11D48" stroke="#881337" strokeWidth="3" />
    <path d="M55 45L68 70L50 62L40 70L45 45" fill="#E11D48" stroke="#881337" strokeWidth="3" />
    {/* Main Medal Circle */}
    <circle cx="40" cy="35" r="26" fill="#F59E0B" stroke="#78350F" strokeWidth="4" />
    <circle cx="40" cy="35" r="20" fill="#FEF08A" stroke="#B45309" strokeWidth="2" />
    <text
      x="40"
      y="40"
      textAnchor="middle"
      fill="#78350F"
      fontSize="12"
      fontWeight="900"
      fontFamily="sans-serif"
    >
      {label}
    </text>
  </svg>
);
