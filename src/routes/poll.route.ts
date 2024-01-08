import express from "express";
import {
  createPoll,
  deletePoll,
  getPoll,
  getPolls,
  vote,
} from "../controllers/poll.controller";

const router = express.Router();

router.post("/", createPoll);
router.get("/", getPolls);
router.get("/:pollId", getPoll);
router.delete("/:pollId", deletePoll);

router.post("/vote", vote);

export default router;
