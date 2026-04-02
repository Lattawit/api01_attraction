CREATE DATABASE IF NOT EXISTS attraction_db;
USE attraction_db;

CREATE TABLE IF NOT EXISTS attractions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  detail TEXT,
  image TEXT,
  location VARCHAR(255),
  rating INT
);