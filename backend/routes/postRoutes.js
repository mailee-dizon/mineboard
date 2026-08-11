import express from "express"
import { createPost, getAllUserPosts, editPost, deletePost, getPostByTitle, getPostByCategory, getAllPost, getPostByDescription } from "../controllers/postController.js";

const router = express.Router();

router.post("/", createPost);
router.get("/category/:categories", getPostByCategory);
router.get("/", getAllPost);
router.get("/:userId", getAllUserPosts);
router.get("/title/:title", getPostByTitle);
router.get("/description/:description", getPostByDescription);
router.put("/:postId", editPost);
router.delete("/:userId/:postId", deletePost);

export default router;