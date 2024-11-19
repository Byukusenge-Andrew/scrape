// src/components/TopChannels.tsx
// export default function TrendingChannels() {
//     const channels = [
//       { id: 1, name: 'Channel 1', subscribers: '1M' },
//       { id: 2, name: 'Channel 2', subscribers: '500K' },
//       { id: 3, name: 'Channel 3', subscribers: '2M' },
//       { id: 4, name: 'Channel 1', subscribers: '1M' },
//       { id: 5, name: 'Channel 2', subscribers: '500K' },
//       { id: 6, name: 'Channel 3', subscribers: '2M' },
//       { id: 7, name: 'Channel 1', subscribers: '1M' },
//       { id: 8, name: 'Channel 2', subscribers: '500K' },
//       { id: 9, name: 'Channel 3', subscribers: '2M' },
//     ];
  
//     return (
//       <section id="trending" className="my-16 mx-20">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           {channels.map((channel) => (
//             <div key={channel.id} className="bg-gray-700 p-24 rounded-lg text-center">
//               <h3 className="text-xl font-semibold text-white">{channel.name}</h3>
//               <p className="text-gray-300">{channel.subscribers} subscribers</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     );
//   }
  
import React, { useEffect, useState } from 'react';

// const API_KEY = process.env.YOUTUBE_API_KEY;
// const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

interface Channel {
  id: {
    channelId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
    };
  };
}

function TrendingChannels() {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const mockChannels = [
      {
        id: { channelId: '1' },
        snippet: {
          title: 'Tech Reviews',
          description: '2.1M subscribers',
          thumbnails: {
            default: { url: 'https://picsum.photos/seed/tech/64' },
            medium: { url: 'https://picsum.photos/seed/tech/128' }
          }
        }
      },
      {
        id: { channelId: '2' },
        snippet: {
          title: 'Gaming Central',
          description: '1.5M subscribers',
          thumbnails: {
            default: { url: 'https://picsum.photos/seed/gaming/64' },
            medium: { url: 'https://picsum.photos/seed/gaming/128' }
          }
        }
      },
      {
        id: { channelId: '3' },
        snippet: {
          title: 'Cooking Masters',
          description: '800K subscribers',
          thumbnails: {
            default: { url: 'https://picsum.photos/seed/cooking/64' },
            medium: { url: 'https://picsum.photos/seed/cooking/128' }
          }
        }
      },
      {
        id: { channelId: '4' },
        snippet: {
          title: 'Travel Diaries',
          description: '1.2M subscribers',
          thumbnails: {
            default: { url: 'https://picsum.photos/seed/travel/64' },
            medium: { url: 'https://picsum.photos/seed/travel/128' }
          }
        }
      },
      {
        id: { channelId: '5' },
        snippet: {
          title: 'Fitness Hub',
          description: '950K subscribers',
          thumbnails: {
            default: { url: 'https://picsum.photos/seed/fitness/64' },
            medium: { url: 'https://picsum.photos/seed/fitness/128' }
          }
        }
      },
      {
        id: { channelId: '6' },
        snippet: {
          title: 'Music Vibes',
          description: '3.2M subscribers',
          thumbnails: {
            default: { url: 'https://picsum.photos/seed/music/64' },
            medium: { url: 'https://picsum.photos/seed/music/128' }
          }
        }
      },
      {
        id: { channelId: '7' },
        snippet: {
          title: 'DIY Projects',
          description: '750K subscribers',
          thumbnails: {
            default: { url: 'https://picsum.photos/seed/diy/64' },
            medium: { url: 'https://picsum.photos/seed/diy/128' }
          }
        }
      },
      {
        id: { channelId: '8' },
        snippet: {
          title: 'Science Today',
          description: '1.8M subscribers',
          thumbnails: {
            default: { url: 'https://picsum.photos/seed/science/64' },
            medium: { url: 'https://picsum.photos/seed/science/128' }
          }
        }
      },
      {
        id: { channelId: '9' },
        snippet: {
          title: 'Pet World',
          description: '2.5M subscribers',
          thumbnails: {
            default: { url: 'https://picsum.photos/seed/pets/64' },
            medium: { url: 'https://picsum.photos/seed/pets/128' }
          }
        }
      }
    ];

    setChannels(mockChannels);
  }, []);

  return (
<section id="trending" className="my-16 mx-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {channels.map((channel) => (
          <div key={channel.id.channelId} className="bg-gray-700 p-24 rounded-lg text-center">
            <img src={channel.snippet.thumbnails.medium.url} alt={channel.snippet.title} className="w-24 h-24 mb-4 rounded-full mx-auto" />
            <h3 className="text-xl font-semibold text-white">{channel.snippet.title}</h3>
            <p className="text-gray-300">{channel.snippet.description}</p>
            <div className="channel-actions text-sm">
                    <a href={`https://youtube.com/channel/${channel.id.channelId}`} 
                       target="_blank" 
                        className="visit-channel-btn bg-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Visit Channel
                    </a>
                </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrendingChannels;