CREATE DATABASE wristband;

CREATE TABLE sensor_data(
id SERIAL PRIMARY KEY,
heart_rate INT,
spo2 INT,
latitude FLOAT,
longitude FLOAT,
status VARCHAR(50),
timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- insert demo data
INSERT INTO sensor_data(heart_rate,spo2,latitude,longitude,status)
VALUES (82,97,10.02,76.30,'Normal');