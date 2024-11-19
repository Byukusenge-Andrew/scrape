'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Channel {
  channel_id: string;
  title: string;
  thumbnail: string;
  subscribers: number;
  video_count: number;
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string | null>(null);
  const [results, setResults] = useState<Channel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const q = searchParams.get('q');
    setQuery(q);

    if (q) {
      setLoading(true);
      fetch(`http://localhost:4567/search?query=${encodeURIComponent(q)}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else if (!Array.isArray(data)) {
            setError('Invalid response from server');
          } else {
            setResults(data);
          }
        })
        .catch((error) => {
          setError('Failed to connect to server');
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [searchParams]);

  return (
    <div className="max-w-5xl mx-20 p-4 py-64  text-white">
      <h1 className="text-2xl font-bold mb-4">Search Results for: {query}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-white">
          {results.map((channel) => (
            // <div key={channel.channel_id} className="bg-gray-800 p-8 rounded shadow-lg">
            //   <img
            //     src={channel.thumbnail}
            //     alt={`${channel.title} thumbnail`}
            //     className="w-full h-40 object-cover rounded"
            //   />
            //   <h2 className="text-xl font-semibold mt-4">{channel.title}</h2>
            //   <p>Subscribers: {formatNumber(channel.subscribers)}</p>
            //   <p>Videos: {formatNumber(channel.video_count)}</p>
            // </div>
            <div  key={channel.channel_id} className=" bg-gray-800 p-8 rounded shadow-lg">
            <img src={channel.thumbnail}
                 alt="${channel.title} thumbnail"
                 onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/100x100?text=No+Image')}
                 className="w-full h-40 object-cover rounded"/>
            <div className="channel-info">
                <h3>${channel.title || 'Untitled Channel'}</h3>
                <p className="stats">
                    ${formatNumber(channel.subscribers)} subscribers 
                    • ${formatNumber(channel.video_count)} videos
                </p>
                <div className="channel-actions">
                    <a href={`https://youtube.com/channel/${channel.channel_id}`} 
                       target="_blank" 
                        className="visit-channel-btn bg-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Visit Channel
                    </a>
                </div>
            </div>
        </div>
          ))}
        </div>
      )}
    </div>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
