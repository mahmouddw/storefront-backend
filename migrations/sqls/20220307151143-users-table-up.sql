CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    username VARCHAR(100),
    password VARCHAR
);
INSERT INTO users
(first_name, last_name, username, password) VALUES
('mahmoud', 'ahmed', 'mahmoudahmed', '$2b$10$4QIQAyn1eTLdgGyAmR1LDeovV6YNy4nTmdriWciirZ2W6X25FWGui');