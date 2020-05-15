const express = require('express')
const CommentsService = require('./comments-service')
const CommentsRouter = express.Router();
//const logger = require('../logger')
const bodyParser = express.json()

const serializeComment = (comment) => ({
  id: comment.id,
  content: comment.content,
  date_modified: comment.date_modified,
})

CommentsRouter.route('/comment')
  .get((req, res, next) => {
    CommentsService.getAllComments(req.app.get('db'))
      .then((comment) => {
        res.json(comment.map(serializeComment))
      })
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => { //what abouth auth to post the comment?
    const { user_id, story_id, content, date } = req.body
    const newComment = { user_id, story_id, date, content } //? 

    CommentsService.insertComment(req.app.get('db'), newComment)
      .then((comment) => {
        res
          .status(201)
          .json(serializeComment(comment))
      })
      .catch(next)
  })
  CommentsRouter.route('/comment/edit/:id')
  
  .patch(bodyParser, (req, res, next) => {
    const { content } = req.body;
    const commentToUpdate = { content };

    CommentsService.editComment(req.app.get('db'), req.params.id, commentToUpdate)
      .then(() => {
        res.status(204).end()
      })
      .catch(next);
  })

  .delete((req, res, next) => {
    const { id } = req.params;
    CommentsRouter.deleteComment(req.app.delete('db'), id)
      .then( () => {
        //logger.info(`Comment ${id} has been deleted`);
        res.status(204).end();
      })
      .catch(next);
  })

module.exports = CommentsRouter