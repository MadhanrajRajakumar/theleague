'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isAssessment = pathname === '/assessment';
  const isResults = pathname === '/results';
  const isAdmin = pathname === '/admin';

  return (
    <header className="w-full border-b border-border-gray bg-background/90 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="group flex items-center space-x-2 text-[#111111] hover:text-[#111111] active:text-[#111111] visited:text-[#111111]">
            <span className="font-semibold text-sm tracking-wider transition-colors duration-300">
              THE LEAGUE
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold group-hover:scale-125 transition-transform duration-300" />
            <span className="hidden sm:inline-block text-[9px] uppercase tracking-widest text-[#111111]/35 font-mono pt-0.5">
              Identity Engine v1
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {isAdmin && (
            <Link 
              href="/"
              className="text-xs text-foreground/60 hover:text-foreground transition-colors duration-200"
            >
              Back to App
            </Link>
          )}

          {!isAssessment && !isResults && !isAdmin && (
            <>
              <Link 
                href="/admin"
                className="text-xs text-foreground/40 hover:text-foreground/80 transition-colors duration-200"
              >
                Admin Panel
              </Link>
              <Link 
                href="/assessment" 
                className="inline-flex items-center justify-center text-xs font-semibold text-white bg-brand-purple hover:bg-purple-700 active:bg-purple-800 rounded-xl px-3.5 py-1.5 transition-all duration-200 cursor-pointer"
              >
                Take Fit Check
              </Link>
            </>
          )}

          {isAssessment && (
            <div className="text-xs text-foreground/50 font-mono tracking-widest">
              CRUCIBLE MODE
            </div>
          )}

          {isResults && (
            <Link
              href="/"
              className="text-xs text-foreground/60 hover:text-foreground border border-border-gray hover:border-foreground/20 bg-white rounded-xl px-3 py-1.5 transition-all duration-200 font-semibold"
            >
              Restart
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
