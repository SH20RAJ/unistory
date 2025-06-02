import HomeClient from './client';

// Prevent static prerendering which causes issues with client components
export const dynamic = 'force-dynamic';

export default function HomePage() {
  return <HomeClient />;
}
