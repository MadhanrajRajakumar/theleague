'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isAssessment = pathname === '/assessment';
  const isResults = pathname === '/results';
  const isAdmin = pathname === '/admin';

  return (
    <header className="w-full border-b border-white/[0.06] bg-[#030303]/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="group flex items-center space-x-2">
            <span className="font-extrabold text-xl tracking-wider text-white group-hover:text-brand-purple transition-colors duration-300">
              THE LEAGUE
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold group-hover:scale-125 transition-transform duration-300" />
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono pt-0.5">
              Identity Engine v1
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {isAdmin && (
            <Link 
              href="/"
              className="text-xs text-white/60 hover:text-white transition-colors duration-200"
            >
              Back to App
            </Link>
          )}

          {!isAssessment && !isResults && !isAdmin && (
            <>
              <Link 
                href="/admin"
                className="text-xs text-white/40 hover:text-white/80 transition-colors duration-200"
              >
                Admin Panel
              </Link>
              <Link 
                href="/assessment" 
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xs font-semibold text-white rounded-lg group bg-gradient-to-br from-purple-600 to-pink-500 group-hover:from-purple-600 group-hover:to-pink-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-800 transition-all duration-300 shadow-md shadow-purple-900/30 cursor-pointer mt-2"
              >
                <span className="relative px-4 py-1.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Take Assessment
                </span>
              </Link>
            </>
          )}

          {isAssessment && (
            <div className="text-xs text-white/50 font-mono">
              CRUCIBLE MODE
            </div>
          )}

          {isResults && (
            <Link
              href="/"
              className="text-xs text-white/60 hover:text-white border border-white/10 hover:border-white/20 rounded-md px-3 py-1.5 transition-all duration-200 font-medium"
            >
              Restart
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
