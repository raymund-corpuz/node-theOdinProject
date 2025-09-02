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