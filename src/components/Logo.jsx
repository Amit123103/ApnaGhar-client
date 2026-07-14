import React from 'react';

const Logo = ({ size = 32 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="apnaghar-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0066FF" />
          <stop offset="100%" stopColor="#00A699" />
        </linearGradient>
      </defs>
      
      {/* House Outline / Fill */}
      <path d="M16 2 L2 14 H6 V26 H26 V14 H30 Z" fill="url(#apnaghar-grad)" />
      
      {/* Map Pin Fill & Cutout Border */}
      <path d="M16 31 Q8 23 8 15 A8 8 0 1 1 24 15 Q24 23 16 31 Z" fill="url(#apnaghar-grad)" stroke="var(--surface)" strokeWidth="2.5" />
      
      {/* Map Pin Hole */}
      <circle cx="16" cy="15" r="3.5" fill="var(--surface)" />
    </svg>
  );
};

export default Logo;
