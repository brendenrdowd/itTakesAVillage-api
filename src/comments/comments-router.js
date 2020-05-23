const express = require('express')
const CommentsService = require('./comments-service')
const UsersService = require('../users/users-service')
const CommentsRouter = express.Router();
const bodyParser = express.json()
const { requireAuth } = require('../middleware/jwt-auth')

// grab author username
const serializeComment = (comment, user = {}) => ({
  id: comment.id,
  comment: comment.comment,
  author: comment.author,
  authorName:user.username
})
CommentsRouter.route('/:id')
  //remember to put back requireAuth
  .get( requireAuth, (req, res, next) => {
  CommentsService.getCommentByStoryId(req.app.get('db'), req.params.id)
    .then((comment) => {
      UserService.getUserById(comment.author)
      .then(user =>{
        res.json(serializeComment(comment,user))
      }).catch(next)
    })
    .catch(next);
  })

  CommentsRouter.route('/')
    .get( requireAuth, (req, res, next) => {
      CommentsService.getAllComments(req.app.get('db'), req.user.id)
        .then((comment) => {
          res.json(comment.map(serializeComment))
        })
        .catch(next);
    })


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