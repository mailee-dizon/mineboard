import { sql } from "../src/config/db.js";

export async function createUser(req, res) {
    try {
        const { username, firstName, lastName, bio, pfp} = req.body;

        if (!username) {
            return res.status(400).json({message: "Username is required"});
        }

        const user = await sql`
            INSERT INTO users(username, firstName, lastName, bio, pfp)
            VALUES (${username}, ${firstName}, ${lastName}, ${bio}, ${pfp})
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
        const username = req.body;


    } catch (error) {

    }
}