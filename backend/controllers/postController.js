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

export async function getPostByCategory(req, res) {
    try {
        const { categories } = req.body;

        if (!categories || !Array.isArray(categories) || categories.length === 0) {
            return res.status(400).json({message: "Need categories to get posts"})
        }

        const posts = await sql`
            SELECT *
            FROM post
            WHERE categories && ${categories}::category[]
            ORDER BY createdat DESC
        `;

        res.status(201).json(posts)
    } catch (error) {
        console.error("Error getting post by categories: ", error);
        res.status(500).json({message: "Error getting post by categories"})
    }
}

export async function getAllPost(req, res) {
    try {
        const posts = await sql`
            SELECT * FROM post
            ORDER BY random()
        `

        res.status(200).json(posts);
    } catch (error) {
        console.error("Error getting all posts: ", error);
        res.status(500).json({message: "Error getting all posts"});
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

export async function getPostByTitle(req, res) {
    try {
        const { title } = req.params;

        if (!title) {
            return res.status(400).json({message: "Need a title"})
        }

        const posts = await sql`
            SELECT * FROM post
            WHERE title ILIKE ${'%' + title + '%'}
            ORDER BY createdat
        `

        res.status(200).json(posts)
    } catch (error) {
        console.error("Error getting post by title: ", error);
        res.status(500).json({message: "Error getting post by title: ", error})
    }
}


export async function editPost(req, res) {
    try {
        const { postId } = req.params;
        const { title, descript, images, categories, likes } = req.body

        if (!postId) {
            res.status(400).json({message: "Post Id needed"});
        }

        const post = await sql`
            UPDATE post
            SET title = COALESCE(${title}, title),
            descript = COALESCE(${descript}, descript),
            images = COALESCE(${images}, images),
            categories = COALESCE(${categories}, categories),
            likes = COALESCE(${likes}, likes)
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