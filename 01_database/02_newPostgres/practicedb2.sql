INSERT INTO users (id, name, email) VALUES
(3,'Raymund', 'raymund@xample');


SELECT * FROM users;

INSERT INTO posts( user_id, title, content)
VALUES
(1, 'First Post', 'This is  Alice first post'),
(1, 'Second Post', 'Alice again with another post'),
(2, 'Bob Thoughts', 'Bob writes something interesting'),
(3, 'Raymuns Adventure', 'Raymund shared a story'),
(3, 'Another from Raymund', 'Raymund post again'),
(4, 'Charlies Wisdom', 'Charlie drops some knowledge');

SELECT * FROM posts;

INSERT INTO promotions (code , description) 
VALUES
('DISCOUNT10', '10% discount on subscription'),
('WELCOME2025', 'Welcome bonus of 2025');

SELECT * FROM user_promotions;

INSERT INTO user_promotions (user_id, promotion_id)
VALUES 
(1,1),
(2,2),
(3,1),
(4,3);

UPDATE users SET email = 'newbob@example' WHERE id = 2;

DELETE FROM users WHERE id =3;

SELECT * FROM users;

SELECT id, name, email, create_at FROM users WHERE create_at > '2024-01-01';


INSERT INTO users (name, email) VALUES ('Daniele', 'daniel@example');

--Update user email address
UPDATE users SET email = 'manxikoy@example' WHERE id = 3;


--Delete user where id is 7
DELETE FROM users WHERE id = 7 RETURNING *;


--Get all posts written by a specific user
SELECT p.id, p.title, p.content, p.created_at
FROM posts p
JOIN users u ON p.user_id = u.id
WHERE u.id =2;

--Count how many posts each user has written
SELECT u.id, u.name, COUNT(p.id) AS post_count
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.id, u.name;

--Show only users who have written at least 5 posts
SELECT u.id, u.name, COUNT(p.id) AS post_count
FROM users u
JOIN posts p ON u.id = p.user_id
GROUP BY u.id, u.name
HAVING COUNT (p.id) >=5;

--List all distinct email domains of users
SELECT DISTINCT SPLIT_PART(email, '@',2) AS domain 
FROM users;

--Get the average post length
SELECT AVG(LENGTH(content)) AS avg_length_post
FROM posts;

--Find users with no posts
SELECT u.id, u.name, u.email FROM users u
LEFT JOIN posts p ON u.id = p.user_id
WHERE p.id IS NULL;

--Show the 3 most recent posts with author names
SELECT p.id, p.title, u.name AS author, p.created_at
FROM posts p
JOIN users u ON p.user_id = u.id
ORDER BY p.created_at DESC
LIMIT 3;

--Count how many users signed up per month
SELECT DATE_TRUNC('month', create_at) AS signup_month,
COUNT(*) AS user_count
FROM users
GROUP BY signup_month
ORDER BY signup_month;

--Find the user who has written maximum number of posts
SELECT u.id, u.name, COUNT(p.id) as post_count
FROM users u
JOIN posts p ON u.id = p.user_id
GROUP BY u.id, u.name
ORDER BY post_count DESC
LIMIT 1;

--Can you run a query that sorts the friends_of_pickles by height_cm in descending order?
SELECT * FROM friends_of_pickles ORDER BY name;

--Can you return a list of the distinct species of animals greater than 50cm in height?
SELECT DISTINCT gender, species FROM friends_of_pickles WHERE height_cm < 100;

--Can you return the single row (and all columns) of the tallest friends_of_pickles?
SELECT * FROM friends_of_pickles ORDER BY height_cm LIMIT 2;

--the total number of rows in the table friends_of_pickles.
SELECT COUNT(*) FROM friends_of_pickles;

--Can you return the number of rows in friends_of_pickles where the species is a dog?
SELECT COUNT(*) FROM friends_of_pickles WHERE species = 'human';

--Can you find the total num_books_read made by this family?
SELECT SUM(num_legs) FROM family_members;

--Can you find the average num_books_read made by each family member?
SELECT AVG(num_legs) FROM family_members;


--Can you find the highest num_books_read that a family member makes?
SELECT MIN(num_legs) FROM family_members;

--Can you return the family members that have the highest num_books_read?
SELECT * FROM family_members WHERE num_legs = (SELECT MIN(num_legs) FROM family_members);

--Can you return a list of celebrities that were born after September 1st, 1980?
SELECT * FROM celebs_born WHERE birthdate < '1985-08-17';

--Can you use an inner join to pair each character name with the actor who plays them? Select the columns: character.name, character_actor.actor_name
SELECT character.name, character_tv_show.tv_show_name
FROM character
INNER JOIN character_tv_show
ON character.id = character_tv_show.character_id;

--Can you use two joins to pair each character name with the actor who plays them? Select the columns: character.name, actor.name
SELECT character.name, tv_show.name
FROM character
INNER JOIN character_tv_show
ON character.id = character_tv_show.character_id
INNER JOIN tv_show
ON character_tv_show.tv_show_id = tv_show.id;

--Can you return a list of characters and TV shows that are not named "Willow Rosenberg" and not in the show "How I Met Your Mother"?
SELECT character.name, tv_show.name
FROM character
INNER JOIN character_tv_show
ON character.id = character_tv_show.character_id
INNER JOIN tv_show
ON character_tv_show.tv_show_id = tv_show.id WHERE character.name != 'Barney Stinson' AND tv_show.name != 'Buffy the Vampire Slayer';

--Can you use left joins to match character names with the actors that play them? Select the columns: character.name, actor.name

SELECT character.name, tv_show.name
FROM character
LEFT JOIN character_tv_show
ON character.id = character_tv_show.character_id
LEFT JOIN tv_show
ON character_tv_show.tv_show_id = tv_show.id;

--Can you use left joins to match character names with the actors that play them, and use aliases to make the query shorter? The aliases for character, character_actor, and actor should be c, ca, and a.
SELECT c.name, t.name
FROM character AS c
LEFT JOIN character_tv_show AS ct
ON c.id = ct.character_id
LEFT JOIN tv_show AS t
ON ct.tv_show_id = t.id;



--Table alias
SELECT c.name, t.name
FROM character AS c
LEFT JOIN character_tv_show AS ct
ON c.id = ct.character_id
LEFT JOIN tv_show AS t
ON ct.tv_show_id = t.id;