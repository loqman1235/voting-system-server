import express from "express";
import {
  createPoll,
  getPoll,
  getPolls,
  vote,
} from "../controllers/poll.controller";

const router = express.Router();

router.post("/", createPoll);
router.get("/", getPolls);
router.get("/:pollId", getPoll);
router.post("/vote", vote);

export default router;
