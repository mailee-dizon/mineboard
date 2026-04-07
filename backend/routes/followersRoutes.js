import express from "express"
import { follow, getFollow, unfollow } from "../controllers/followersController.js";

const router = express.Router()

router.post("/:userId/:followerUserId", follow);
router.get("/:userId", getFollow);
router.delete("/:userId/:followerUserId", unfollow);

export default router;