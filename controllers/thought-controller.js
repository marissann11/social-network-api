const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  async getAllThought(req, res) {
    try {
      const dbThoughtData = await Thought.find({});
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // get one thought by id
  async getThoughtById({ params }, res) {
    try {
      const dbThoughtData = await Thought.findOne({ _id: params.id });
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // create new thought
  async createThought({ params, body }, res) {
    try {
      const dbThoughtData = await Thought.create(body);
      await User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      );
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // update thought by id
  async updateThought({ params, body }, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: params.id },
        body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // delete thought
  async deleteThought({ params }, res) {
    try {
      const dbThoughtData = await Thought.findOneAndDelete({ _id: params.id });
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // create reaction
  async createReaction({ params, body }, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        {
          new: true,
          runValidators: true,
        }
      );
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // delete reaction
  async deleteReaction({ params, body }, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        {
          new: true,
          runValidators: true,
        }
      );
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
};

module.exports = thoughtController;
