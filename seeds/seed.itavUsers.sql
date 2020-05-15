BEGIN;

TRUNCATE
  itav_users
  RESTART IDENTITY CASCADE;

INSERT INTO itav_users (email, name, username, location, password)
VALUES
  ('test@gmail.com', 'Tess Testersen', 'Tester1', 90013,'Password'),
  ('jd@gmail.com', 'John Doe', 'jdoe', 90027,'Password');

COMMIT;