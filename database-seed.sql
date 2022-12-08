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
 ('Prince', 'Flitterbell');

--  CREATE TABLE Recommendations
-- (
-- 	id SERIAL NOT NULL,
-- 	title VARCHAR(30) NOT NULL,
-- 	text TEXT NOT NULL,
-- 	nameWork VARCHAR(30) NOT NULL,
-- 	group VARCHAR(15) NOT NULL,
-- 	tags TEXT,
-- 	image VARCHAR(70) NOT NULL,
-- 	authorRating SMALLINT NOT NULL,
-- 	likes INTEGER NOT NULL,
-- 	FOREIGN KEY (userId) REFERENCES Users (id),
-- 	CONSTRAINT rec_pkey PRIMARY KEY (id)
-- );

-- CREATE TABLE Comments
-- (
-- 	FOREIGN KEY (userId) REFERENCES Users (id) ON DELETE CASCADE,
-- 	FOREIGN KEY (recId) REFERENCES Recommendations (id) ON DELETE CASCADE,
-- 	text TEXT
-- );

-- CREATE TABLE UserRatings
-- (
-- 	FOREIGN KEY (userId) REFERENCES Users (id) ON DELETE CASCADE,
-- 	FOREIGN KEY (recId) REFERENCES Recommendations (id) ON DELETE CASCADE,
-- 	authorRating SMALLINT NOT NULL 
-- );

-- CREATE TABLE UserRoles
-- (
-- 	FOREIGN KEY (userId) REFERENCES Users (id) ON DELETE CASCADE,
-- 	role VARCHAR(30)
-- );