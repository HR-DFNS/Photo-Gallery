USE PhotoGallery;

DROP TABLE IF EXISTS places_photos;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS places;
DROP TABLE IF EXISTS reviewers;

CREATE TABLE places (id INT PRIMARY KEY, name VARCHAR(255));
CREATE TABLE reviewers (id INT PRIMARY KEY, name VARCHAR(70), avatar VARCHAR(100));
CREATE TABLE photos (id INT PRIMARY KEY, url VARCHAR(100), width INT, height INT,reviewer_id INT, FOREIGN KEY (reviewer_id) REFERENCES reviewers(id));
CREATE TABLE places_photos (place_id INT, photo_id INT, FOREIGN KEY (place_id) REFERENCES places(id), FOREIGN KEY (photo_id) REFERENCES photos(id));
