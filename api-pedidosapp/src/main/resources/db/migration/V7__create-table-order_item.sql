CREATE TABLE order_item (
    id SERIAL UNIQUE PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity NUMERIC NOT NULL,
    unitary_value NUMERIC NOT NULL,
    amount NUMERIC NOT NULL,
    discount NUMERIC NULL,
    addition NUMERIC NULL
);

ALTER TABLE order_item ADD CONSTRAINT fk_order_item_order
FOREIGN KEY (order_id) REFERENCES order (id);

ALTER TABLE order_item ADD CONSTRAINT fk_order_item_product
FOREIGN KEY (product_id) REFERENCES product (id);