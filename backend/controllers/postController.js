import { sql } from "../src/config/db.js";

export async function createPost(req, res) {
    try {
        const { userId, title, descript, images, categories } = req.body

        if (!userId || !title || !images) {
            return res.status(400).json({message: "UserId, title, or image is needed"});
        }

        const post = await sql`
            INSERT INTO post(userid, title, descript, images, categories)
            VALUES (${userId}, ${title}, ${descript}, ${images}, ${categories})
            RETURNING *
        `

        res.status(201).json(post);
    } catch (error) {
        console.error("Error posting: ", error);
        res.status(500).json({message: "Error posting"})
    }
}

export async function getAllUserPosts(req, res) {
    try {
        const { userId } = req.params

        if (!userId) {
            return res.status(400).json({message: "Need UserId"});
        }

        const post = await sql`
            SELECT * FROM post
            WHERE userid = ${userId}
            ORDER BY createdat
        `

        res.status(201).json(post);
    } catch (error) {
        console.error("Error getting users post: ", error);
        res.status(500).json({message: "Error getting users posts"});
    }
}

export async function editPost(req, res) {
    try {
        const { postId } = req.params;
        const { userId, title, descript, images, categories } = req.body

        if (!postId) {
            res.status(400).json({message: "Post Id needed"});
        }

        const post = await sql`
            UPDATE post
            SET userid = ${userId},
            title = ${title},
            descript = ${descript},
            images = ${images},
            categories = ${categories}
            WHERE postId = ${postId}
            RETURNING *
        `

        res.status(200).json(post)
    } catch (error) {
        console.error("Error updating post: ", error);
        res.status(500).json({message: "Error updating post"});
    }
}

export async function deletePost(req, res) {
    try {
        const { userId, postId } = req.params

        if (!userId || !postId) {
            res.status(400).json({message: "Need Post Id and User Id"})
        }

        const post = await sql`
            DELETE FROM post
            WHERE postid = ${postId} AND userid = ${userId}
            RETURNING *
        `

        res.status(204).json(post)
    } catch (error) {
        console.error("Error deleting post: ", error);
        res.status(500).json({message: "Error deleting post"})
    }
}