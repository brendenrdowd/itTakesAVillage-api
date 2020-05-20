CREATE TABLE
IF NOT EXISTS itav_comments
(
  id SERIAL PRIMARY KEY,
  comment TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT now
()
);

CREATE TABLE
IF NOT EXISTS itav_users
(
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE, 
  name TEXT NOT NULL, 
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL, 
  location TEXT NOT NULL
);

CREATE TABLE
IF NOT EXISTS  itav_stories
(
  id SERIAL PRIMARY KEY,
  issue TEXT NOT NULL, 
  flag TEXT NOT NULL, 
  resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT now
()
);

ALTER TABLE itav_stories
  ADD COLUMN
    author INTEGER REFERENCES itav_users(id)
    ON DELETE SET NULL;

ALTER TABLE itav_comments
  ADD COLUMN
    author INTEGER REFERENCES itav_users(id)
    ON DELETE SET NULL;

ALTER TABLE itav_comments
  ADD COLUMN
    story INTEGER REFERENCES itav_stories(id)
    ON DELETE SET NULL;

