//Gets all stories, specific stories by id
//Services to allow insertion, updating, and deleting story
const StoryService = {
  getAllStories(db) {
    return db.select("*").from("itav_stories");
  },
  getById(db, id) {
    return db.from("itav_stories").select("*").where({ id }).first();
  },
  insertStory(db, newStory) {
    return db
      .insert(newStory)
      .into("itav_stories")
      .returning("*")
      .then(([story]) => story);
  },
  deleteStory(db, id) {
    return db("itav_stories").where({ id }).delete();
  },

  updateStory(db, id, newStoryFields) {
    return db("itav_stories").where({ id }).update(newStoryFields);
  },
};

module.exports = StoryService;
