import { sql } from "../src/config/db.js";

export async function likePost(req, res) {
    try {
        const { userId, postId } = req.params;

        if (!userId || !postId) {
            res.status(400).json({message: "Need userId"});
        }

        const like = await sql`
            INSERT INTO likes(userid, postId)
            VALUES (${userId}, ${postId})
            RETURNING *
        `

        res.status(201).json(like);

    } catch (error) {
        console.error("Error liking post: ", error);
        res.status(500).json({message: "Error liking post"});
    }
}

export async function unlikePost(req, res) {
    try {
        const { userId, postId } = req.params;

        if (!userId || !postId) {
            res.status(400).json({message: "Need user Id"});
        }

        const unlike = await sql`
            DELETE FROM likes
            WHERE userid = ${userId} AND postid = ${postId}
            RETURNING *
        `

        res.status(204).json(unlike)
    } catch (error) {
        console.error("Error unliking post: ", error);
        res.status(500).json({message: "Error unliking post"});
    }
}