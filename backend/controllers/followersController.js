import { sql } from "../src/config/db.js";

export async function getFollow(req, res) {
    try {
        const { userId } = req.params;

        if (!userId) {
            res.status(400).json({message: "Need user id"});
        }

        const follow = await sql`
            SELECT * FROM followers
            WHERE userId = ${userId}
        `

        res.status(201).json(follow)
    } catch (error) {
        
    }
}

export async function follow(req, res) {
    try {
        const { userId, followerUserId } = req.params;

        if (!userId || !followerUserId) {
            res.status(400).json({message: "Need follow and follower user id"});
        }

        const follow = await sql`
            INSERT INTO followers(userId, follower_userID)
            VALUES (${userId}, ${followerUserId})
            RETURNING *
        `

        res.status(201).json(follow)

    } catch (error) {
        console.error("Error following user: ", error);
        res.status(500).json({message: "Error following user"});
    }
}

export async function unfollow(req,res) {
    try {
        const { userId, followerUserId } = req.params

        if (!userId || !followerUserId) {
            res.status(400).json({message: "Need follow and follower id"})
        }

        const unfollow = await sql`
            DELETE FROM followers
            WHERE userId = ${userId} AND follower_userID = ${followerUserId}
            RETURNING *
        `

        res.status(204).json(unfollow)
    } catch (error) {
        console.error("Error unfollowing user: ", error)
        res.status(500).json({message: "Error unfollowing user"})
    }
}