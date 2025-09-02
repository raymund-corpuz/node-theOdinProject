INSERT INTO users (name, email)
VALUES ('Alice', 'alice@example'),
('Bob Smith', 'bob@example'),
('Charlie Brown', 'charlie@example');

SELECT * FROM users;

UPDATE users SET email = 'newbob@example' WHERE id = 2;

DELETE FROM users WHERE id =3;

INSERT INTO promotions ( code, description ) VALUES ('FREESTUFF', 'Free Trial');

SELECT * FROM promotions;

SELECT u.name, p.code FROM user_promotions up
JOIN users u ON up.user_id = u.id
JOIN promotions p ON up.promotion_id = p.id;


SELECT u.name, COUNT(p.id) AS total_posts
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.name;