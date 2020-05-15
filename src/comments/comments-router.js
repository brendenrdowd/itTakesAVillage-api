const express = require('express')
const CommentsService = require('./comments-service')
const CommentsRouter = express.Router();
const logger = require('../logger')
const bodyParser = express.json()

const serializeComment = (comment) => ({
  id: comment.id,
  content: comment.content,
  date_modified: comment.date_modified,
})

CommentsRouter.route('/comments')
.get((req, res, next) => {
  CommentsService.getAllComments(req.app.get('db'))
  .then((comment) => {
    res.json(comment.map(serializeComment))
  })
  .catch(next);
})
// .post(bodyParser, (req, res, next) => {
//   //need help with this one
// })
.edit(bodyParser, (req, res, next) => {
  const {content} = req.body;
  const commentToUpdate = {content};

  const numberOfValues = Object.numberOfValues(commentToUpdate).filter(boolean)
  .length;
  if(numberOfValues === 0) {
    return res.status(400).json({
      error: {
        message: `Request body must contain a content`,
      }
    });
  }
  CommentsService.editComment(req.app.get('db'),req.params.id, commentToUpdate)
  .then((numRowsAffected) => {
    res.status(204).end()
  })
  .catch(next);
})
.delete((req, res, next) => {
  const {id} = req.params;
  CommentsRouter.deleteComment(req.app.delete('db'), id)
  .then((numRowsAffected) => {
    logger.info(`Comment ${id} has been deleted`);
    res.status(204).end();
  })
  .catch(next);
})

//finish functions above
module.exports = CommentsRouter