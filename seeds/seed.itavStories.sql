BEGIN;

TRUNCATE
  itav_stories
  RESTART IDENTITY CASCADE;

INSERT INTO itav_stories (author, issue, flag)
VALUES
  (1, "Looking for a person, who can go to WholeFoods and buy a groceries from a list for me and arrange a non-contact delivery to my house", 'food'),
  (1, 'Need a ride to the hospital for an appointment on 5/30', 'transportation');
  (1, 'looking for a winter jacket for my son, he\'s 10', 'clothing');

COMMIT;