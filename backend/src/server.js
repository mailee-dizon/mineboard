import express from "express"
import { ENV } from "./config/env.js"
import { sql } from "./config/db.js"
import userRoutes from "../routes/userRoutes.js"
import postRoutes from "../routes/postRoutes.js"
import job from "./config/cron.js"


const app = express()
app.use(express.json())

job.start()
const PORT = ENV.PORT

async function initDB() {
    try {
        //await sql`IF NOT EXISTS (CREATE TYPE  category AS ENUM ('interior, exterior, house, town, castle, decoration'))`

        await sql`CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            userID VARCHAR NOT NULL UNIQUE,
            username VARCHAR UNIQUE NOT NULL,
            firstName TEXT,
            lastName TEXT,
            createdAt DATE NOT NULL DEFAULT CURRENT_DATE,
            bio TEXT,
            pfp TEXT
        )`

        await sql`CREATE TABLE IF NOT EXISTS post(
            postID SERIAL PRIMARY KEY,
            userID VARCHAR NOT NULL,
            createdAt DATE NOT NULL DEFAULT CURRENT_DATE,
            likes INT,
            title VARCHAR NOT NULL,
            descript VARCHAR,
            images VARCHAR[] NOT NULL,
            categories category[],
            CONSTRAINT fk_user FOREIGN KEY(userID) REFERENCES users (userID)
        )`

        await sql`CREATE TABLE IF NOT EXISTS likes(
            postID INT NOT NULL,
            userID VARCHAR NOT NULL,
            likeDate DATE NOT NULL DEFAULT CURRENT_DATE,
            CONSTRAINT fk_user FOREIGN KEY(userID) REFERENCES users (userID),
            CONSTRAINT fk_post FOREIGN KEY(postID) REFERENCES post (postID)
        )`

        await sql`CREATE TABLE IF NOT EXISTS board(
            boardID SERIAL PRIMARY KEY,
            boardName VARCHAR NOT NULL,
            boardImage TEXT,
            userID VARCHAR NOT NULL,
            postID INT NOT NULL,
            CONSTRAINT fk_user FOREIGN KEY(userID) REFERENCES users (userID),
            CONSTRAINT fk_post FOREIGN KEY(postID) REFERENCES post (postID)
        )`

        await sql`CREATE TABLE IF NOT EXISTS followers(
            userID VARCHAR NOT NULL,
            followedAt DATE NOT NULL DEFAULT CURRENT_DATE,
            CONSTRAINT fk_user FOREIGN KEY(userID) REFERENCES users (userID)
        )`

        
    } catch (error) {
        console.error("Error creating table: ", error);
        process.exit(1);
    }
}

app.get("/api/health", (req, res) => {
    res.status(200).json({success: true})
})

app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

initDB().then(() => {
    app.listen(PORT, () => {
        console.log("SERVER RUNNING ON PORT: ", PORT)
    })
})