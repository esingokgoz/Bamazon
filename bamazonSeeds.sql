DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 4) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Eloquent JavaScript", "Books", 25.31, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("JavaScript & JQuery", "Books", 30.75, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Mind Map", "Books", 29.99, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Stud Earrings", "Jewelry", 14.99, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("GEMSME 18K Rose Gold", "Jewelery", 22.25, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Donut Shop K-Cup Pods 72-Count", "Grocery & Gourmet Food", 35.99, 4);

SELECT * FROM products;