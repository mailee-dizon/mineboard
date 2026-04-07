import { sql } from "../src/config/db.js";

export async function getFollow(req, res) {
    try {
        const { userId } = req.params;

        if (!userId) {
            res.status(400).json({message: "Need user id"});
        }

        const follow = await sql`
            SELECT * FROM followers
            WHERE follow_userID = ${userId}
        `

        res.status(201).json(follow)
    } catch (error) {
        
    }
}

export async function follow(req, res) {
    try {
        const { followUserId, followerUserId } = req.params;

        if (!followUserId || !followerUserId) {
            res.status(400).json({message: "Need follow and follower user id"});
        }

        const follow = await sql`
            INSERT INTO followers(follow_userID, follower_userID)
            VALUES (${followUserId}, ${followerUserId})
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
        const { followUserId, followerUserId } = req.params

        if (!followUserId || !followerUserId) {
            res.status(400).json({message: "Need follow and follower id"})
        }

        const unfollow = await sql`
            DELETE FROM followers
            WHERE follow_userID = ${followUserId} AND follower_userID = ${followerUserId}
            RETURNING *
        `

        res.status(204).json(unfollow)
    } catch (error) {
        console.error("Error unfollowing user: ", error)
        res.status(500).json({message: "Error unfollowing user"})
    }
}