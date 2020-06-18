const express = require('express');
const StoryService = require('./story-service');
const logger = require('../logger');
const StoryRouter = express.Router();
const bodyParser = express.json();
const { requireAuth } = require('../middleware/jwt-auth');

//Converts objects into bytes to store into database
const serializeStory = (story) => ({
  id: story.id,
  issue: story.issue,
  created_at: story.created_at,
  author: story.author,
  flag: story.flag,
  resolved: story.resolved,
});

//Gets all stories
StoryRouter.route('/')
  .get(requireAuth, (req, res, next) => {
    StoryService.getAllStories(req.app.get('db'), req.user.id)
      .then((story) => {
        res.json(story.map(serializeStory));
      })
      .catch(next);
  })
  .post(bodyParser, requireAuth, (req, res, next) => {
    const { issue, flag } = req.body;
    const author = req.user.id;
    const newStory = { issue, flag, author };

    for (const field of ['issue', 'flag']) {
      if (!req.body[field]) {
        logger.error(`${field} is required`);
        return res.status(400).send({
          error: { message: `${field} is required` },
        });
      }
    };
    //Creates story and story id for specific story
    StoryService.insertStory(req.app.get('db'), newStory)
      .then((story) => {
        logger.info(`story with id ${story.id} has been created!`);
        res
          .status(201)
          .location(`api/story/${story.id}`)
          .json(serializeStory(story));
      })
      .catch(next);
  });

//Checks and gets story by id
StoryRouter.route('/:id')
  .all((req, res, next) => {
    const { id } = req.params;
    StoryService.getById(req.app.get('db'), id)
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
  //Allows user to delete story
  .delete((req, res, next) => {
    const { id } = req.params;
    StoryService.deleteStory(req.app.get('db'), id)
      .then((story) => {
        logger.info(` story with id ${story.id} has been deleted!`);
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(bodyParser, (req, res, next) => {
    const { resolved, issue } = req.body;
    const storyToUpdate = { resolved, issue };
    if (resolved === !resolved) {
      return res.status(400).json({
        error: {
          message: `Request body must contain resolved`,
        },
      });
    }
    //Allow user to update story
    StoryService.updateStory(req.app.get('db'), req.params.id, storyToUpdate)
      .then(() => {
        logger.info(`story has been resolved!`);
        res
          .status(200)
          .json({
            message: {
              message: `resolved has been updated`,
            },
          })
          .end();
      })
      .catch(next);
  });

module.exports = StoryRouter;
