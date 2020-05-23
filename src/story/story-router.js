const express = require("express");
const StoryService = require("./story-service");
const logger = require("../logger");
const StoryRouter = express.Router();
const bodyParser = express.json();
const { requireAuth } = require("../middleware/jwt-auth");

const serializeStory = (story) => ({
  id: story.id,
  // in place of name
  issue: story.issue,
  created_at: story.created_at,
  // in place of folder_id
  author: story.author,
  // in place of content
  flag: story.flag,
  // need to add
  resolved: story.resolved,
});

StoryRouter.route("/")
  // .get((req, res, next) => {
  .get(requireAuth, (req, res, next) => {
    StoryService.getAllStories(req.app.get("db"), req.user.id)
      // StoryService.getAllStories(req.app.get("db"))
      .then((story) => {
        res.json(story.map(serializeStory));
      })
      .catch(next);
  })
  // .post(bodyParser, (req, res, next) => {
  .post(bodyParser, requireAuth, (req, res, next) => {
    const { issue, flag } = req.body;
    const author = req.user.id;
    const newStory = { issue, flag, author };

    for (const field of ["issue", "flag"]) {
      if (!req.body[field]) {
        logger.error(`${field} is required`);
        return res.status(400).send({
          error: { message: `${field} is required` },
        });
      }
    }

    StoryService.insertStory(req.app.get("db"), newStory)
      .then((story) => {
        logger.info(`story with id ${story.id} has been created!`);
        res
          .status(201)
          .location(`/story/${story.id}`)
          .json(serializeStory(story));
      })
      .catch(next);
  });

StoryRouter.route("/:id")
  .all((req, res, next) => {
    const { id } = req.params;
    StoryService.getById(req.app.get("db"), id)
      .then((story) => {
        console.log(id);
        if (!story) {
          logger.error(`story with id ${id} not found!`);
          return res.status(404).json({
            error: { message: `story with id ${id} not found` },
          });
        }
        res.story = story;
        next();
      })
      .catch(next);
  })
  .get((req, res) => {
    res.json(serializeStory(res.story));
  })
  .delete((req, res, next) => {
    const { id } = req.params;
    StoryService.deleteStory(req.app.get("db"), id)
      .then((numRowsAffected) => {
        logger.info(` story with id ${id} has been deleted!`);
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(bodyParser, (req, res, next) => {
    const { issue, id } = req.body;
    const storyToUpdate = { id };

    const numberOfValues = Object.numberOfValues(storyToUpdate).filter(Boolean)
      .length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Request body must contain a issue`,
        },
      });
    }

    StoryService.updateStory(req.app.get("db"), id, issue)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = StoryRouter;
