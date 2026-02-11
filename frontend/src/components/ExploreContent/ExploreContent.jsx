import React from 'react'
import { PostFeed } from '../Post/PostFeed'

export default function ExploreContent({results}) {
  return (
    <div>
       {results.length > 0 ? (
            <PostFeed initialPosts={results}/>
        ) : (
            <p>No results found.</p>
        )}

    </div>
  )
}


