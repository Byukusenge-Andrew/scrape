interface VideoGridProps {
    channelId: string;
  }
  
  export default function VideoGrid({ channelId }: VideoGridProps) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       
       
        {[1, 2, 3, 4].map((_, index) => (
          <div key={index} className="bg-white/10 rounded-lg p-4">
            <div className="aspect-video bg-white/5 rounded mb-2"></div>
            <h3 className="text-white font-medium">Sample Video Title {index + 1}</h3>
            <p className="text-gray-400 text-sm">1.2K views • 2 days ago</p>
          </div>
        ))}
      </div>
    );
  }
  