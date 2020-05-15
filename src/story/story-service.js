const StoryService = {
  // check if Plural story vs stories
  getAllStories(knex) {
    return knex.select("*").from("story");
  },
  getById(knex, id) {
    return knex.from("story").select("*").where({ id }).first();
  },
  insertStory(knex, newStory) {
    return knex
      .insert(newStory)
      .into("story")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  deleteStory(knex, id) {
    return knex("story").where({ id }).delete();
  },
  updateStory(knex, id, newStoryFields) {
    return knex("story").where({ id }).update(newStoryFields);
  },
};

module.exports = StoryService;