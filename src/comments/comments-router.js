const express = require('express')
const CommentsService = require('./comments-service')
const CommentsRouter = express.Router();
const bodyParser = express.json()
const logger = require("../logger");
const { requireAuth } = require('../middleware/jwt-auth')

// grab author username -- need to verify in client
const serializeComment = (comment) => ({
  id: comment.id,
  comment: comment.comment,
  author: comment.author
})
//Maps through comments by id of the story
CommentsRouter.route('/:id')
  .get((req, res, next) => {
    CommentsService.getCommentByStoryId(req.app.get('db'), req.params.id)
      .then((comment) => {
        res.json(comment.map(serializeComment))
      })
      .catch(next);
  })
  //remember to put back requireAuth
  //Deletes comments and once request is fulfilled, sends back 204 message saying deleted
  .delete(requireAuth, (req, res, next) => {
    const { id } = req.params;
    CommentsService.deleteComment(req.app.get('db'), id)
      .then(() => {
        // problem with this return??
        res.status(204).send("deleted");
      })
      .catch(next);
  })
//Looks for all comments
CommentsRouter.route('/')
  .get(requireAuth, (req, res, next) => {
    CommentsService.getAllComments(req.app.get('db'), req.user.id)
      .then((comment) => {
        res.json(comment.map(serializeComment))
      })
      .catch(next);
  })

  //Checks require fields are present when posting a comment
  .post(bodyParser, requireAuth, (req, res, next) => {
    const { author, comment, story } = req.body
    const newComment = { author, story, comment }
    console.log(req.body)
    for (const field of ["comment", "story"]) {
      if (!req.body[field]) {
        return res.status(400).send({
          error: { message: `${field} is required` },
        })
      }
    }
    CommentsService.insertComment(req.app.get('db'), newComment)
      .then((comment) => {
        res
          .status(201)
          .json(serializeComment(comment))
      })
      .catch(next)
  })
//Allows user to edit comments made and updates in database
CommentsRouter.route('/edit/:id')

  .patch(bodyParser, (req, res, next) => {
    const { comment } = req.body;
    const commentToUpdate = { comment };

    CommentsService.editComment(req.app.get('db'), req.params.id, commentToUpdate)
      .then(() => {
        res.status(204).end()
      })
      .catch(next);
  })

module.exports = CommentsRouter