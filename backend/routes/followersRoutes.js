import express from "express"
import { follow, getFollow, unfollow } from "../controllers/followersController.js";

const router = express.Router()

router.post("/:followUserId/:followerUserId", follow);
router.get("/:userId", getFollow);
router.delete("/:followUserId/:followerUserId", unfollow);

export default router;