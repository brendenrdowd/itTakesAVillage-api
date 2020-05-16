const express = require('express')
const CommentsService = require('./comments-service')
const CommentsRouter = express.Router();
const bodyParser = express.json()

const serializeComment = (comment) => ({
  id: comment.id,
  content: comment.content,
})

CommentsRouter.route('/')
  .get((req, res, next) => {
    CommentsService.getAllComments(req.app.get('db'))
      .then((comment) => {
        res.json(comment.map(serializeComment))
      })
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
    for (const field of ["user_id", "comment"]) {
      if (!req.body[field]) {
        return res.status(400).send({
          error: { message: `${field} is required` },
        })
      }
    }
    const { user_id, comment } = req.body
    const newComment = { user_id, comment } 

    CommentsService.insertComment(req.app.get('db'), newComment)
      .then((comment) => {
        res
          .status(201)
          .location(`/comment/${comment.id}`)
          .json(serializeComment(comment))
      })
      .catch(next)
  })
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

  .delete((req, res, next) => {
    const { id } = req.params;
    CommentsRouter.deleteComment(req.app.delete('db'), id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })

module.exports = CommentsRouter