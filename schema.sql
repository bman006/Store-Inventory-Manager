DROP DATABASE bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Veganic Sprouted Ancient Maize Flakes", "Cereal", 4.50, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Boxed Water", "Drinks", 1.89, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Guac-Kale-Mole", "Snacks", 8.99, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beef Tallow", "Cooking", 16.67, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pumpkin Spice Latte-Flavored Beer", "Drinks", 12.50, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kelp Granules", "Cooking", 3.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Edible Flowers", "Produce", 7.50, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tea Cocktail Mix", "Drinks", 5.60, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kale Littles", "Snacks", 12.99, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Elderflower-Infused Drinks", "Drinks", 2.99, 10);
