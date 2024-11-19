'use client';

import React from 'react';
import TrendingChannels from '@/components/TopChannels';

export default function Trending() {
  return(
<section className="py-20 bg-white/10 rounded-lg container mx-auto py-64">
        <h2 className="text-3xl font-semibold text-white text-center mb-8">
          Trending Channels
        </h2>
        <TrendingChannels />
      </section>
  );
}
