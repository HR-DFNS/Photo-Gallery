USE PhotoGallery;

DROP TABLE IF EXISTS places1;

CREATE TABLE places1 (
  id INT PRIMARY KEY, 
  place_name VARCHAR(255),
  url1 VARCHAR(100), 
  width1 INT, 
  height1 INT,
  rname1 VARCHAR(50), 
  avatar1 VARCHAR(100),
  url2 VARCHAR(100),
  width2 INT,
  height2 INT,
  rname2 VARCHAR(50),
  avatar2 VARCHAR(100),
  url3 VARCHAR(100), 
  width3 INT, 
  height3 INT,
  rname3 VARCHAR(50), 
  avatar3 VARCHAR(100)
);
