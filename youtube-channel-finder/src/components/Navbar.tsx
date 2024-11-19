'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white/5 backdrop-blur-md border-b text-xl border-gray-800 ml-40 mr-40 mt-10 mb-10 rounded-lg px-5 py-5 fixed w-[1300px] z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-4xl font-bold text-red-500">
            YTFinder
          </Link>

          <div className="flex space-x-4">
            {['/', '/trending', '/analytics'].map((path) => (
              <Link
                key={path}
                href={path}
                className={`text-gray-300 hover:text-black hover:bg-white transition-all duration-300 px-3 py-2 rounded-md ${
                  pathname === path ? 'bg-gray-800' : ''
                }`}
              >
                {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
