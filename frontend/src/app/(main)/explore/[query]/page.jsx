import ExploreContent from '@/components/ExploreContent/ExploreContent';
import { searchPosts } from '@/components/TopBar/SearchApi';

export default async function ExplorePage( {params} ) {
    const {query} = await params; 
    const controller = new AbortController();
    const signal = controller.signal;
    const results = await searchPosts(query, signal)

  return (
    <div>
      <h1>Explore Page</h1>
      <p>Search results for "{decodeURIComponent(query)}"</p>
      <ExploreContent results={results}/>
    </div>
  );
}
