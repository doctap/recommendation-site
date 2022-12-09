CREATE TABLE Users
(
	id SERIAL NOT NULL,
	firstName VARCHAR(20) NOT NULL,
	lastName VARCHAR(20) NOT NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);

INSERT INTO Users(firstName, lastName) VALUES
 ('Meadow', 'Crystalfreak'),
 ('Buddy-Ray', 'Perceptor'),
 ('Prince', 'Flitterbell'),
 ('Frank ', 'Holland'),
 ('Ursula', 'McKinney'),
 ('Amy', 'Townsend'),
 ('Grace', 'Jacobs'),
 ('Joella', 'Hill'),
 ('Lorin', 'Harris'),
 ('Morgan', 'Bridges');

 CREATE TABLE Reviews
(
	id SERIAL PRIMARY KEY NOT NULL,
	title VARCHAR(30) NOT NULL,
	text TEXT NOT NULL,
	nameWork VARCHAR(30) NOT NULL,
	type VARCHAR(15) NOT NULL,
	tags TEXT,
	image VARCHAR(70) NOT NULL,
	authorRating SMALLINT NOT NULL,
	likes INTEGER NOT NULL DEFAULT 0,
	userId INTEGER,
	FOREIGN KEY (userId) REFERENCES Users (id) ON DELETE CASCADE
);

CREATE TABLE Comments
(
	userId INTEGER,
	reviewId INTEGER,
	text TEXT,
	FOREIGN KEY (userId) REFERENCES Users (id) ON DELETE CASCADE,
	FOREIGN KEY (recId) REFERENCES Reviews (id) ON DELETE CASCADE
);

CREATE TABLE UserRatings
(
	userId INTEGER,
	recId INTEGER,
	userRating SMALLINT NOT NULL,
	FOREIGN KEY (userId) REFERENCES Users (id) ON DELETE CASCADE,
	FOREIGN KEY (recId) REFERENCES Reviews (id) ON DELETE CASCADE,
);

CREATE TABLE UserRoles
(
	userId INTEGER,
	role VARCHAR(30) NOT NULL,
	FOREIGN KEY (userId) REFERENCES Users (id) ON DELETE CASCADE
);