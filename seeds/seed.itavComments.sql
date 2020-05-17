  BEGIN;

TRUNCATE
  itav_comments
  RESTART IDENTITY CASCADE;

INSERT INTO itav_comments (author, comment, story)
VALUES
  (2, 'I can buy your food for you, send me the list', 1),
  (2, 'I can give you a ride to the hospital', 2);

COMMIT;