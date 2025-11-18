import React from 'react'

// Octopus hugging a vinyl record - clean SVG logo
export default function Logo({ size = 80, className = '' }) {
  const dimension = typeof size === 'number' ? size : 80
  return (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Octopus Vinyl Logo"
    >
      <defs>
        <radialGradient id="vinylGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="60%" stopColor="#0b7fc0" />
          <stop offset="100%" stopColor="#0a5270" />
        </radialGradient>
        <linearGradient id="octoGrad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
      </defs>

      {/* Vinyl record */}
      <circle cx="60" cy="60" r="42" fill="url(#vinylGrad)" />
      <circle cx="60" cy="60" r="38" fill="none" stroke="#0ea5e9" strokeOpacity="0.25" strokeWidth="2" />
      <circle cx="60" cy="60" r="3.5" fill="#e2e8f0" />
      {/* Vinyl grooves */}
      {[12, 18, 24, 30, 34, 38].map((r, i) => (
        <circle key={r} cx="60" cy="60" r={r} fill="none" stroke="#38bdf8" strokeOpacity={0.15 - i*0.02} strokeWidth="1" />
      ))}

      {/* Octopus body hugging vinyl */}
      <g>
        <circle cx="48" cy="48" r="18" fill="url(#octoGrad)" />
        {/* Eyes */}
        <circle cx="42" cy="46" r="2.8" fill="#0f172a" />
        <circle cx="54" cy="46" r="2.8" fill="#0f172a" />
        <circle cx="41.5" cy="45.5" r="0.9" fill="#fff" />
        <circle cx="53.5" cy="45.5" r="0.9" fill="#fff" />
        {/* Tentacles wrapping around the record */}
        <path d="M40 60c8 6 18 6 26 0" fill="none" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round"/>
        <path d="M36 56c-6 6-8 16 2 18 6 1 10-6 9-10" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round"/>
        <path d="M58 56c8 8 16 4 18-2" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round"/>
        <path d="M44 64c-4 8 2 12 8 12" fill="none" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round"/>
      </g>
    </svg>
  )
}
