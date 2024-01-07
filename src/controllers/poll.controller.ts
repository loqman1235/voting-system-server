import { Request, Response } from "express";
import Poll from "../models/poll.model";

// Get polls
const getPolls = async (req: Request, res: Response) => {
  try {
    const polls = await Poll.find().lean();
    if (polls.length === 0) {
      return res.status(404).json({ message: "No polls found" });
    }

    // Add percentage to each option
    const pollsWithPercentage = polls.map((poll) => {
      const totalVotes = poll.votes.reduce(
        (acc, voteCount) => acc + voteCount,
        0
      );
      const votesWithPercentages = poll.votes.map((voteCount, index) => {
        const percentage =
          totalVotes > 0 ? ((voteCount / totalVotes) * 100).toFixed(0) : 0;
        return {
          option: poll.options[index],
          votes: voteCount,
          percentage: percentage,
        };
      });
      return { ...poll, votes: votesWithPercentages };
    });

    res.status(200).json({ polls: pollsWithPercentage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get poll byy id
const getPoll = async (req: Request, res: Response) => {
  try {
    const { pollId } = req.params;
    const poll = await Poll.findById(pollId).lean();
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    const totalVotes = poll.votes.reduce(
      (acc, voteCount) => acc + voteCount,
      0
    );
    const votesWithPercentages = poll.votes.map((voteCount, index) => {
      const percentage =
        totalVotes > 0 ? ((voteCount / totalVotes) * 100).toFixed(0) : 0;
      return {
        option: poll.options[index],
        votes: voteCount,
        percentage: percentage,
      };
    });

    res.status(200).json({ poll: { ...poll, votes: votesWithPercentages } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Create poll
const createPoll = async (req: Request, res: Response) => {
  try {
    const { question, options } = req.body;

    if (!question || !options) {
      return res
        .status(400)
        .json({ message: "Question and options are required" });
    }

    const poll = new Poll({
      question,
      options,
      votes: new Array(options.length).fill(0),
    });

    await poll.save();
    res.status(201).json({ message: "Poll created successfully", poll });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Vote
const vote = async (req: Request, res: Response) => {
  try {
    const { pollId, option } = req.body;

    if (!pollId || !option) {
      return res
        .status(400)
        .json({ message: "Poll id and option are required" });
    }

    const poll = await Poll.findById(pollId);

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    if (poll.votes[option] >= poll.options.length) {
      return res
        .status(400)
        .json({ message: "You have already voted for this option" });
    }

    // Check if option is valid
    if (option >= poll.options.length) {
      return res.status(400).json({ message: "Option does not exist" });
    }

    poll.votes[option] += 1;

    await poll.save();

    res.status(200).json({ message: "Vote added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { getPolls, createPoll, getPoll, vote };
