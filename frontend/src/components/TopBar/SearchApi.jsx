import { API_URL } from '../../../constants/api';

export async function searchPosts( query, signal ){
    const title_results = await fetch(`${API_URL}/posts/title/${query}`, {signal}); // getPostsByTitle
    const title_data = title_results.ok ? await title_results.json() : [];
    let category_data = [];

    if (query.length > 3){
        const category_results = await fetch(`${API_URL}/posts/category`, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    categories: [query]
                }), 
                signal

            }); // getPostsByCategory
        if (category_results.ok) {
            category_data = await category_results.json();
        }
        else{
            console.log("Failed to get categories", category_results.status)
            category_data = [];
        }
    }

    let results = [];
    if(Array.isArray(category_data)){
        const merged = [...title_data, ...category_data];
        results = Array.from(
            new Map(merged.map(post => [post.postid, post])).values()
        );
    }
    else{
        results = title_data
    }
    return results;
}