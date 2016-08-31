CREATE TABLE estate (

	name		varchar(80) PRIMARY KEY,
	location	point

);

INSERT INTO estate VALUES ('Babershop Audrey Hepburn', '(56.317200,44.000600)');
INSERT INTO estate VALUES ('магазин, полуподвал', '(56.319220,44.002000)');
INSERT INTO estate VALUES ('мастерская, У Джобса', '(56.300477,44.019030)');


SELECT name FROM estate WHERE (location <-> point(56.317530,44.000717)) < 0.1;