CREATE TABLE Users
(
	id SERIAL NOT NULL,
	first_name VARCHAR(20) NOT NULL,
	last_name VARCHAR(20) NOT NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);

INSERT INTO Users(firstName, lastName) VALUES
 ('Meadow', 'Crystalfreak'),
 ('Buddy-Ray', 'Perceptor'),
 ('Prince', 'Flitterbell'),
 ('Frank', 'Holland'),
 ('Ursula', 'McKinney'),
 ('Amy', 'Townsend'),
 ('Grace', 'Jacobs'),
 ('Joella', 'Hill'),
 ('Lorin', 'Harris'),
 ('Morgan', 'Bridges');

 CREATE TABLE Reviews
(
	id SERIAL PRIMARY KEY NOT NULL,
	title VARCHAR(100) NOT NULL,
	text TEXT NOT NULL,
	name_work VARCHAR(100) NOT NULL,
	type VARCHAR(15) NOT NULL,
	tags TEXT,
	image VARCHAR(100) NOT NULL,
	author_rating SMALLINT NOT NULL,
	likes INTEGER NOT NULL DEFAULT 0,
	user_id INTEGER,
	FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
);

INSERT INTO reviews (title, text, name_work, type, tags, image, author_rating, user_id) 
VALUES 
(
	'Lorem ipsum', 
	'simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 
	'Van Helsing',
	'book',
	'#book #horror',
	'imageName', 
	7,
	1
),
(
	'JavaScript', 
	'simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 
	'JavaScript. Полное руководство', 
	'book',
	'#book #programming #javascript #webdevelop',
	'imageName', 
	8,
	2
),
(
	'TypeScript', 
	'simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 
	'TypeScript. Подробное Руководство', 
	'book',
	'#book #programming #typescript #webdevelop',
	'imageName', 
	9,
	3
),
(
	'Lorem ipsum', 
	'simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 
	'Звездный лорд',
	'book',
	'#book #fantasy',
	'imageName', 
	3,
	4
),
(
	'Lorem ipsum', 
	'simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 
	'Значит, я умерла', 
	'book',
	'#book #thriller',
	'imageName', 
	6,
	5
),
(
	'Lorem ipsum', 
	'simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 
	'Инверсия жизни', 
	'book',
	'#book #horror',
	'imageName', 
	9,
	6
);

CREATE TABLE Comments
(
	user_id INTEGER,
	review_id INTEGER,
	text TEXT,
	FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE,
	FOREIGN KEY (review_id) REFERENCES Reviews (id) ON DELETE CASCADE
);

CREATE TABLE UserRatings
(
	user_id INTEGER,
	review_id INTEGER,
	user_rating SMALLINT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE,
	FOREIGN KEY (review_id) REFERENCES Reviews (id) ON DELETE CASCADE,
);

CREATE TABLE UserRoles
(
	user_id INTEGER,
	role VARCHAR(30) NOT NULL,
	FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
);