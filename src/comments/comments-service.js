const CommentsService = {
  getAllComments(knex) {
    return knex.select('*').from('comment');
  },
  getById(knex, id) {
    return knex.from('comment').select('*').where({id}).first();
  },
  insertComment(knex, newComment) {
    return knex
    .insert(newComment)
    .into('comment')
    .returning('*')
    .then((rows) => {
      return rows [0];
    });
  },
  deleteComment(knex, id) {
    return knex('comment').where({id}).delete();
  },
  editComment(knex, id, newComment) { //I'm not sure about proper name on this one!!!
    return knex('comment').where({id}).update(newComment);
  },
}

module.exports = CommentsService