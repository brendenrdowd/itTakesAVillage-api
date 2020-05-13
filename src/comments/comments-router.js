const express = require('express')
const CommentsService = require('./comments-service')
const CommentsRouter = express.Router();
//add logger

const serializeComment = (comment) => ({
  id: comment.id,
  user_id: comment.user_id,
  content: comment.content,
})

CommentsRouter.route('/comments')
.get((req, res, next) => {
  CommentsService.getAllComments(req.app.get('db'))
  .then((comment) => {
    res.json(comment.map(serializeComment))
  })
  .catch(next);
})
.post()
.edit()
.delete()

//finish functions above