import { API_URL } from '../../../constants/api';

export const likePost = async (postid, { isLiked, setIsLiked, numLikes, setNumLikes, post }, userInfo) => {
  const { isLoaded, user } = userInfo;
  if (!isLoaded) return;

  try {
    if(isLiked === false){ // user not in backend, but u liked in frontend (new like) ;;;; need get. you are posting/deleting with this, not checking if user is in the likes table
      const res = await fetch(`${API_URL}/likes/${user.id}/${post.postid}`, {method: 'POST'});
      if (!res.ok) throw new Error("Failed to like");
      setIsLiked(true);
      //setNumLikes(prev=>prev+1)
    }else{ // user exists in backend, but frontend not reflecting (just unliked)
      const res = await fetch(`${API_URL}/likes/${user.id}/${post.postid}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Failed to unlike");
      setIsLiked(false);
      //setNumLikes(prev=>prev-1)
    }

  } catch (err) {
    // rollback UI 
    console.error("Like update failed:", err);
  }
};
