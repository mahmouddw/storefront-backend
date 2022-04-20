CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price INTEGER,
    category VARCHAR(100)
);
INSERT INTO products (name, price, category) VALUES ('London Canvas', 50, 'canvas-prints');
INSERT INTO products (name, price, category) VALUES ('Berlin Canvas', 50, 'canvas-prints');
INSERT INTO products (name, price, category) VALUES ('London Framed Poster', 70, 'framed-prints');
INSERT INTO products (name, price, category) VALUES ('Berlin Framed Poster', 70, 'framed-prints');