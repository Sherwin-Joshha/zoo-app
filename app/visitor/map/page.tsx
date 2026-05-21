import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// Dynamically import the map component with ssr: false 
// because react-leaflet relies on window and document objects at runtime.
const ZooMap = dynamic(() => import('@/components/ZooMap'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-[calc(100vh-64px)] min-h-[600px] bg-slate-50">
      <div className="flex flex-col items-center text-green-600 gap-4">
        <Loader2 className="animate-spin" size={48} />
        <p className="font-medium text-slate-600">Loading Interactive Map...</p>
      </div>
    </div>
  ),
});

export default function VisitorMapPage() {
  return (
    <main>
      <ZooMap />
    </main>
  );
}
