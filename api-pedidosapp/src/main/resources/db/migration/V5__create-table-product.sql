CREATE TABLE product (
    id SERIAL UNIQUE PRIMARY KEY,
    description TEXT NOT NULL,
    unit VARCHAR(50) NOT NULL,
    unitary_value NUMERIC NOT NULL,
    stock_quantity NUMERIC,
    supplier_id INT NOT NULL
);

ALTER TABLE product ADD CONSTRAINT fk_product_supplier
FOREIGN KEY (supplier_id) REFERENCES supplier (id);