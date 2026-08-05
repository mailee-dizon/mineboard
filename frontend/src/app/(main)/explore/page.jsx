import ExploreContent from '@/components/ExploreContent/ExploreContent';
import { API_URL } from '../../../../constants/api';

export default async function ExplorePage() {
    const res = await fetch(`${API_URL}/posts/`); 
    const data = await res.json();

  return (
    <div>
      <ExploreContent results={data}/>
    </div>
  );
}
