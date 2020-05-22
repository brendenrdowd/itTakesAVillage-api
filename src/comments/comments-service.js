const CommentsService = {
  getAllComments(knex) {
    return knex.select('*').from('itav_comments');
  },
  getCommentByStoryId(knex, story) {
    return knex.select('*').from('itav_comments').where({story})
  },
  getById(knex, id) {
    return knex.from('itav_comments').select('*').where({id}).first();
  },
  insertComment(knex, newComment) {
    return knex
    .insert(newComment)
    .into('itav_comments')
    .returning('*')
    .then((rows) => {
      return rows [0];
    });
  },
  deleteComment(knex, id) {
    return knex('itav_comments').where({id}).delete();
  },
  editComment(knex, id, newComment) { 
    return knex('itav_comments').where({id}).update(newComment);
  },
}

module.exports = CommentsService