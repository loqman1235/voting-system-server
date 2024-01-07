import express from "express";
import { createPoll, getPoll, getPolls } from "../controllers/poll.controller";

const router = express.Router();

router.post("/", createPoll);
router.get("/", getPolls);
router.get("/:pollId", getPoll);

export default router;
