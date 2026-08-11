import ExploreContent from '@/components/ExploreContent/ExploreContent';
import { searchPosts } from '@/components/TopBar/SearchApi';
import { API_URL } from '../../../../../constants/api';

export default async function ExplorePage({ params, searchParams }) {
    const { query } = await params;
    const { selected, category } = await searchParams;

    const controller = new AbortController();
    const signal = controller.signal;

    let results = [];
    let searchResultPH = decodeURIComponent(query);

    // Category selected
    if (category) {
        const response = await fetch(
            `${API_URL}/posts/category/${category}`
        );

        results = await response.json();
        searchResultPH = category.charAt(0).toUpperCase() + category.slice(1);
    }

    // Normal search
    else {
        results = await searchPosts(query, signal);

        if (selected) {
            const selectedPost = results.find(
                r => r.postid == selected
            );

            const others = results.filter(
                r => r.postid != selected
            );

            results = selectedPost
                ? [selectedPost, ...others]
                : results;

            searchResultPH = selectedPost
                ? selectedPost.title
                : searchResultPH;
        }
    }

    return (
        <div>
            <p>
                {category
                    ? `Posts in "${searchResultPH}"`
                    : `Search results for "${searchResultPH}"`
                }
            </p>

            <ExploreContent results={results} />
        </div>
    );
}