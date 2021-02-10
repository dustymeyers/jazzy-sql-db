-- Empty out tables and start fresh
DROP TABLE "artists";
DROP TABLE "songs";

-- Create table for artists data
CREATE TABLE "artists" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80) NOT NULL,
    "birthdate" DATE
);

-- Create table for songs data
CREATE TABLE "songs" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR(255) NOT NULL,
	"length" VARCHAR(10) NOT NULL,
	"released" DATE
);

-- Add sample data to artists
INSERT INTO "artists"
    ("name", "birthdate")
VALUES
	('Ella Fitzgerald', '04-25-1917'),
	('Dave Brubeck', '12-06-1920'),
	('Miles Davis', '05-26-1926'),
	('Esperanza Spalding', '10-18-1984');
	
-- add sample data to songs
INSERT INTO "songs"
	("title", "length", "released")
VALUES
	('Take Five', '5:24', '1959-09-29'),
	('So What', '9:22', '1959-08-17'),
	('Black Gold', '5:17', '2012-02-01');


