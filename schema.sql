CREATE TABLE estate (

	name		varchar(80) PRIMARY KEY,
	location	point NOT NULL

);

INSERT INTO estate VALUES ('Babershop Audrey Hepburn', '(56.317200,44.000600)');
INSERT INTO estate VALUES ('магазин, полуподвал', '(56.319220,44.002000)');
INSERT INTO estate VALUES ('мастерская, У Джобса', '(56.300477,44.019030)');


SELECT name FROM estate WHERE (location <-> point(56.317530,44.000717)) < 0.1;

DROP TABLE places;
CREATE TABLE places (
	description		varchar(80) PRIMARY KEY,
	location 		point NOT NULL,
	place_id		varchar(80) NOT NULL,
	modified		timestamp DEFAULT LOCALTIMESTAMP
);

INSERT INTO places (description, location, place_id) VALUES ('Gavnoo, Nizhny Novgorog', '(56.314000,44.070000)', 'HAJ54BOHWH4B4B4BG0S98RPAI' );

SELECT description, location, place_id FROM places WHERE description LIKE '%Gavnoo%' ORDER BY modified DESC LIMIT 5;

UPDATE places SET modified = LOCALTIMESTAMP WHERE description LIKE 'Gavnoo, %';