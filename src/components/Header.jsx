import React from 'react'
import Logo from './Logo'

export default function Header() {
  return (
    <header className="relative z-10 w-full">
      <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size={56} className="drop-shadow-[0_10px_25px_rgba(139,92,246,0.45)]" />
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">OctoVinyl</h1>
            <p className="text-xs md:text-sm text-sky-200/80 -mt-1">Deep cuts, fresh finds, and sea-level vibes</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sky-100/80">
          <a href="#latest" className="hover:text-white transition-colors">Latest</a>
          <a href="#genres" className="hover:text-white transition-colors">Genres</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
        </nav>
      </div>
    </header>
  )
}
