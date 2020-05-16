const StoryService = {
  // check if Plural story vs stories
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
    // .then((rows) => {
    //   return rows[0];
    // });
  },
  deleteStory(db, id) {
    return db("itav_stories").where({ id }).delete();
  },
  updateStory(db, id, newStoryFields) {
    return db("itav_stories").where({ id }).update(newStoryFields);
  },
};

module.exports = StoryService;
