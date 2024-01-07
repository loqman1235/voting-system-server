import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("poll route");
});

export default router;
