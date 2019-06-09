DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  dept_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  PRIMARY KEY (id)
);

INSERT INTO products (id, product_name, dept_name, price, stock) 
VALUES  (1, 'whiteboard', 'Office Equipment', 25, 4);

INSERT INTO products (id, product_name, dept_name, price, stock) 
VALUES  (2, 'marker', 'Office Supplies', 3, 20);

INSERT INTO products (id, product_name, dept_name, price, stock) 
VALUES  (3, 'eraser', 'Office Supplies', 2.50, 6);

INSERT INTO products (id, product_name, dept_name, price, stock) 
VALUES  (4, 'desk', 'Office Equipment', 250, 2);

INSERT INTO products (id, product_name, dept_name, price, stock) 
VALUES  (5, 'paper', 'Office Supplies', 35, 14);

INSERT INTO products (id, product_name, dept_name, price, stock) 
VALUES  (6, 'chair', 'Office Equipment', 125, 2);

INSERT INTO products (id, product_name, dept_name, price, stock) 
VALUES  (7, 'Exploding Kittens', 'Games', 20, 1);

INSERT INTO products (id, product_name, dept_name, price, stock) 
VALUES  (8, 'Risk', 'Games', 20, 2);

INSERT INTO products (id, product_name, dept_name, price, stock) 
VALUES  (9, 'Carcassone', 'Games', 25, 4);

INSERT INTO products (id, product_name, dept_name, price, stock) 
VALUES  (10, 'staples', 'Office Supplies', 4, 4);