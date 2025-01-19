import dynamic from 'next/dynamic';

// Dynamically import the MapComponent
const MapComponent = dynamic(() => import('./map'), { ssr: false });

export default function Map() {
  return (
    <div className="p-4">
          <MapComponent />
    </div>
  );
}