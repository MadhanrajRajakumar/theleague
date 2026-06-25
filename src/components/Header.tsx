'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isAssessment = pathname === '/assessment';
  const isResults = pathname === '/results';
  const isAdmin = pathname === '/admin';

  return (
    <header className="w-full border-b border-[#2A2A2A] bg-[#0D0D0D] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="group flex items-center text-[#C9A84C] hover:text-[#C9A84C] active:text-[#C9A84C]">
            <span className="font-barlow font-extrabold text-sm uppercase tracking-[3px]">
              THE LEAGUE
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {isAdmin && (
            <Link 
              href="/"
              className="text-xs text-[#8A8880] hover:text-[#F2F0EB] transition-colors duration-200"
            >
              Back to App
            </Link>
          )}

          {!isAssessment && !isResults && !isAdmin && (
            <>
              <Link 
                href="/admin"
                className="text-xs text-[#8A8880]/60 hover:text-[#F2F0EB]/80 transition-colors duration-200"
              >
                Admin Panel
              </Link>
              <Link 
                href="/assessment" 
                className="inline-flex items-center justify-center text-xs font-semibold text-[#0D0D0D] bg-[#C9A84C] hover:bg-[#b0913c] rounded-[6px] px-3.5 py-1.5 transition-colors duration-200 cursor-pointer"
              >
                Take Fit Check &rarr;
              </Link>
            </>
          )}

          {isAssessment && (
            <div className="text-xs text-[#8A8880] font-mono tracking-widest">
              CRUCIBLE MODE
            </div>
          )}

          {isResults && (
            <Link
              href="/"
              className="text-xs text-[#8A8880] hover:text-[#F2F0EB] border border-[#2A2A2A] hover:border-[#C9A84C] bg-[#161616] rounded-[6px] px-3 py-1.5 transition-colors duration-200 font-semibold"
            >
              Restart
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
