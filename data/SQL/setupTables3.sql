USE PhotoGallery;

DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS places;
DROP TABLE IF EXISTS reviewers;

CREATE TABLE places (id INT PRIMARY KEY, name VARCHAR(255));
CREATE TABLE reviewers(id INT PRIMARY KEY, name VARCHAR(50), avatar VARCHAR(100));
CREATE TABLE photos (id INT PRIMARY KEY, url VARCHAR(100), width INT, height INT, places_id INT,reviewer_id INT, FOREIGN KEY (places_id) REFERENCES places(id),FOREIGN KEY (reviewer_id) REFERENCES reviewers(id));
