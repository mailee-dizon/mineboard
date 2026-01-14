import { sql } from "../src/config/db.js";

export async function createUser(req, res) {
    try {
        const { userId, username, firstName, lastName, bio, pfp} = req.body;

        if (!userId || !username) {
            return res.status(400).json({message: "Username is required"});
        }

        const user = await sql`
            INSERT INTO users(userId, username, firstName, lastName, bio, pfp)
            VALUES (${userId}, ${username}, ${firstName}, ${lastName}, ${bio}, ${pfp})
            RETURNING *
        `
        
        res.status(201).json(user);
    } catch (error) {
        console.log("Error creating user: ", error);
        res.status(500).json({error: "something went wrong"});
    }
}

export async function getByUsername(req, res) {
    try {
        const {username} = req.params;

        if (!username) {
            return res.status(400).json({ message: "Username needed"});
        }

        const user = await sql`
            SELECT * FROM users
            WHERE username = ${username}
        `
        res.status(201).json(user)
        console.log(user)
    } catch (error) {
        console.error("Error getting user by username: ", error);
        res.status(500).json({message: "Couldn't find user by username"})
    }
}

export async function getByUserId(req, res) {
    try {
        const {userId} = req.params;

        if (!userId) {
            return res.status(400).json({message: "UserId needed"});
        }

        const user = await sql`
        SELECT * FROM users
        WHERE userid = ${userId}`

        res.status(201).json(user)

    } catch (error) {
        console.error("Error getting user by user id: ", error);
        res.status(500).json({message: "Couldn't find user by user id."})
    }
}

export async function editUser(req, res) {
    try {
        const { userId } = req.params;
        const { username, firstName, lastName, bio, pfp } = req.body;

        if (!userId) {
            return res.status(400).json({message:"Need User Id"});
        }

        const user = await sql`
            UPDATE users
            SET username = COALESCE(NULLIF(${username}, ''), username),
            firstName = COALESCE(NULLIF(${firstName}, ''), firstName),
            lastName = COALESCE(NULLIF(${lastName}, ''), lastName),
            bio = COALESCE(NULLIF(${bio}, ''), bio),
            pfp = COALESCE(${pfp}, pfp)
            WHERE userid = ${userId}
            RETURNING *
        `

        res.status(200).json(user);
    } catch (error) {
        console.error("Error updating user: ", error);
        res.status(500).json({message: "Error updating user"});
    }
}

export async function deleteUser(req, res) {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({message: "Need User Id"});
        }

        const user = await sql`
            DELETE FROM users
            WHERE userid = ${userId}
            RETURNING *
        `

        res.status(204).json(user)
    } catch (error) {
        console.error("Error deleting user: ", error);
        res.status(500).json({message: "Error deletin user"});
    }
}