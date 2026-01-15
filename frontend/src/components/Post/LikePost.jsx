import { API_URL } from '../../../constants/api';

export const likePost = async (postid, { isLiked, setIsLiked, numLikes, setNumLikes }, userInfo) => {
    const { isLoaded, user } = userInfo;

    // if already is liked (isLiked) -> click means UNLIKE -> setIsLiked(false), remove like from likes @postid, userid, setNumLikes(prev-1)
    // if !isLiked -> they are LIKING -> setIsLiked(true), add to likes @ postid, using userid (current user), setNumLikes(prev+1)
    try {
        if (!isLoaded) return;
        if (isLiked) {
            setIsLiked(false);
            setNumLikes(prev => prev-1);
            const res = await fetch(`${API_URL}/likes/${user.id}/${postid}`, {method: "DELETE"});
            
            if (!res.ok) {
                console.error("Failed to unlike post: ", res.text());
                return;
            }

        }
        else{
            setIsLiked(true);
            setNumLikes(prev => prev+1);
            const res = await fetch(`${API_URL}/likes/${user.id}/${postid}`, {
                method: "POST", 
            });

            if (!res.ok) {
                console.error("Failed to like post: ", res.text());
                return;
            }

        }
        
    }
    catch (err) {
        console.log('Error liking/unliking post: ', err);
    }
    
  return numLikes;
}
