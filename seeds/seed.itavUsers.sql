BEGIN;

TRUNCATE
  itav_users
  RESTART IDENTITY CASCADE;

INSERT INTO itav_users (email, name, username, location, password)
VALUES
  ('test@gmail.com', 'Tess Testersen', 'Tester1', 90013,'$2a$12$iP1FZupzySFAXmxZhpNEKeTTogfvbXwOzFWqECar2O8rHT7SOjlvm'),
  ('jd@gmail.com', 'John Doe', 'jdoe', 90027,'$2a$12$e.Qzc5sJDXPM0RRzEuO7B.7gXLEAYgqSeMx.w7QPjgbrixhXULi7C');

COMMIT;