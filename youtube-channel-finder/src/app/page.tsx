'use client';
import SearchBar from '@/components/SearchBar';
import TrendingChannels from '@/components/TopChannels';
import Features from '@/components/Features';
import { useNotifications } from '@/components/useNotifications';

export default function Home() {
  const { addNotification } = useNotifications();

  return (
    <div className="min-h-screen min-w-full bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="text-center py-64">
        <h1 className="text-5xl font-bold text-white mb-4 ">
          Discover YouTube Channels
        </h1>
        <p className="text-xl text-gray-300 mb-6 ">
          Easily find, analyze, and track YouTube channels.
        </p>
        <SearchBar />
      </section>

      {/* Features Section */}
      <section className="py-20 container mx-auto">
        <h2 className="text-3xl font-semibold text-white text-center mb-8">
          Why Use YTFinder?
        </h2>
        <Features />
      </section>
    </div>
  );
}
