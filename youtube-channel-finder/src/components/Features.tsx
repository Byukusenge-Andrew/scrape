// src/components/Features.tsx
export default function Features() {
    const features = [
      { id: 1, title: 'Discover Channels', description: 'Find any YouTube channel by name.' },
      { id: 2, title: 'Analyze Data', description: 'Get detailed stats about channels.' },
      { id: 3, title: 'Track Trends', description: 'Stay updated with trending channels.' },
    ];
  
    return (
      <section id="features" className="my-16">
        <h2 className="text-3xl font-bold text-white mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.id} className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="text-gray-300 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  