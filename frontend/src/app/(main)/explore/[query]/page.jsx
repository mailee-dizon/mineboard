import ExploreContent from '@/components/ExploreContent/ExploreContent';
import { searchPosts } from '@/components/TopBar/SearchApi';
import { SearchResults } from '@/components/TopBar/SearchResults';

export default async function ExplorePage( {params, searchParams} ) {
    const {query} = await params; 
    const {selected} = await searchParams; // selected result 

    const controller = new AbortController();
    const signal = controller.signal;
    const results = await searchPosts(query, signal)

    let orderedResults = results;
    let searchResultPH = decodeURIComponent(query);
    if (selected) { // if they selected a specific result
      const selectedPost = results.find(r => r.postid == selected);
      const others = results.filter(r => r.postid != selected);
      orderedResults = selectedPost ? [selectedPost, ...others] : results;
      searchResultPH = selectedPost ? selectedPost.title : searchResultPH;
    }

  return (
    <div>
      <h1>Explore Page</h1>
      <p>Search results for "{searchResultPH}"</p>
      <ExploreContent results={orderedResults}/>
    </div>
  );
}
