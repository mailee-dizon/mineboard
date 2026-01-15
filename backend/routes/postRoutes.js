import express from "express"
import { createPost, getAllUserPosts, editPost, deletePost, getPostByTitle, getPostByCategory } from "../controllers/postController.js";

const router = express.Router();

router.post("/", createPost);
router.post("/category", getPostByCategory);
router.get("/:userId", getAllUserPosts);
router.get("/title/:title", getPostByTitle);
router.put("/:postId", editPost);
router.delete("/:userId/:postId", deletePost);

export default router;