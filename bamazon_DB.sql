DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL (5,2) default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Random Book", "Entertainment", 10.75, 55);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Bed", "Bedroom", 115, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Table", "Home", 75.55, 22);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Towel", "Bath", 15.12, 35);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Cup", "Kitchen", 3.15, 45);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Random Movie", "Entertainment", 10.30, 66);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Water Bottle", "Sports", 15.65, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Keychains", "Misc.", 2.15, 99);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Pens", "Office", 4.45, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Notebooks", "Office", 16.65, 10);


SELECT * FROM products

