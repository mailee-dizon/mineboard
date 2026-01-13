import { sql } from "../src/config/db.js"

export async function createBoard(req, res) {
    try {
        const { userId } = req.params
        const { boardName, boardImage, postId } = req.body

        if (!userId || !boardName) {
            res.status(400).json({message: "Need userId and boardName"});
        }

        const board = await sql`
            INSERT INTO board(boardname, boardimage, postid, userid)
            VALUES (${boardName}, ${boardImage}, ${postId}, ${userId})
            RETURNING *
        `

        res.status(201).json(board)
    } catch (error) {
        console.error("Error creating board: ", error)
        res.status(500).json({message: "Error creating baord"})
    }
}

export async function saveToBoard(req, res) {
    try {
        const { boardId } = req.params
        const { postId } = req.body

        if (!boardId) {
            res.status(400).json({message: "Need board Id"})
        }

        const add = await sql`
            UPDATE board
            SET postid = postid || ${postId}
            WHERE boardid = ${boardId}
            RETURNING *
        `

        res.status(200).json(add)
    } catch (error) {
        console.error("Error saving to board: ", error)
        res.status(500).json({message: "Error saving to board"})
    }
}

export async function removeFromBoard(req, res) {
    try {
        const { boardId } = req.params;
        const { postId } = req.body;

        if (!boardId) {
            res.status(400).json({message: "Need board Id"})
        }

        const remove = await sql`
            UPDATE board
            SET postid = ARRAY(
                SELECT unnest(postid)
                EXCEPT
                SELECT unnest(${postId}::int[])
            )
            WHERE boardid = ${boardId}
            RETURNING *
        `

        res.status(200).json(remove);
    } catch (error) {
        console.error("Error removing post from board: ", error);
        res.status(500).json({message: "Error removing post from board"});
    }
}

export async function getBoardByName(req, res) {
    try {
        const { boardName } = req.params

        if (!boardName) {
            res.status(400).json({message: "Need board name"})
        }

        const board = await sql`
            SELECT * FROM board
            WHERE boardname = ${boardName}
        `

        res.status(201).json(board)
    } catch (error) {
        console.error("Error getting board: ", error)
        res.status(500).json({message: "Error getting board"})
    }
}

export async function deleteBoard(req, res) {
    try {
        const { boardId } = req.params

        if (!boardId) {
            res.status(400).json({message: "Need board id"})
        }

        const board = await sql`
            DELETE FROM board
            WHERE boardid = ${boardId}
            RETURNING *
        `

        res.status(204).json(board)
    } catch (error) {
        console.error("Error deleting board: ", error)
        res.status(500).json({message: "Error deleting board"})
    }
}