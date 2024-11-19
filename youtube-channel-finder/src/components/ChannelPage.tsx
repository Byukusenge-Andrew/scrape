// src/app/channel/[id]/page.tsx
import VideoGrid from '@/components/VideoGrid';

interface ChannelPageProps {
  params: { id: string };
}

export default function ChannelPage({ params }: ChannelPageProps) {
  const { id } = params;

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">Channel Details</h1>
        <p className="text-gray-400">Channel ID: {id}</p>
      </div>

      <VideoGrid channelId={id} />
    </div>
  );
}
