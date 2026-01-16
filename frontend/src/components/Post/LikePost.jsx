import { API_URL } from '../../../constants/api';

export const likePost = async (postid, { isLiked, setIsLiked, numLikes, setNumLikes, post }, userInfo) => {
  const { isLoaded, user } = userInfo;
  if (!isLoaded) return;

  const delta = isLiked ? -1 : 1; // in order to update like (INTEGER) in post
  const newLikes = numLikes + delta;

  // optimistic UI
  setIsLiked(!isLiked);
  setNumLikes(newLikes);

  try {
    const likeRes = await fetch(
      `${API_URL}/likes/${user.id}/${postid}`, // post/delete a like within likes
      { method: isLiked ? "DELETE" : "POST" } // combine logic
    );

    if (!likeRes.ok) throw new Error(await likeRes.text());

    const postRes = await fetch(`${API_URL}/posts/${postid}`, { // update like (INTEGER) in post
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        ...post, // set all old data again
        likes: newLikes // update likes!!!
        }),
    });

    if (!postRes.ok) throw new Error(await postRes.text());

  } catch (err) {
    // rollback UI 
    setIsLiked(isLiked);
    setNumLikes(numLikes);
    console.error("Like update failed:", err);
  }
};
