import Studio from './Studio';

// Sanity is loaded only inside the client `Studio` wrapper, never in the
// RSC/server graph (where React.createContext is unavailable).
export const dynamic = 'force-static';

export default function StudioPage() {
  return <Studio />;
}
