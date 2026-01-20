import express from "express"
import { createPost, getAllUserPosts, editPost, deletePost, getPostByTitle, getPostByCategory, getAllPost } from "../controllers/postController.js";

const router = express.Router();

router.post("/", createPost);
router.post("/category", getPostByCategory);
router.get("/", getAllPost);
router.get("/:userId", getAllUserPosts);
router.get("/title/:title", getPostByTitle);
router.put("/:postId", editPost);
router.delete("/:userId/:postId", deletePost);

export default router;