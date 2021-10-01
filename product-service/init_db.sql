CREATE TABLE IF NOT EXISTS products(
    id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title       TEXT NOT NULL,
    description TEXT,
    price       INTEGER
);

CREATE TABLE IF NOT EXISTS stocks(
    product_id uuid,
    count      INTEGER,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO products(title, description, price)
VALUES ('iPhone 12', 'iPhone 12, 64 Gb, Purple', 729),
       ('iPhone 13', 'iPhone 13, 128 Gb, Black', 1500),
       ('iPhone 12 Pro', 'iPhone 12 Pro, 128 Gb, Graphite', 999),
       ('iPhone 12 Pro Max', 'iPhone 12 Pro Max, 128 Gb, Gold', 1099),
       ('iPhone SE', 'iPhone SE, 64 Gb, (PRODUCT)RED', 399),
       ('iPhone 11', 'iPhone 11, 64 Gb, Yellow', 559);

INSERT INTO stocks(product_id, count)
VALUES ('9ecf696f-faba-4c58-873c-cd2f45b0b8f6', 10),
       ('54ec54f7-56d1-49cf-b17c-dc2977cc3f8c', 15),
       ('2019ba33-de9b-4e08-97ec-0a4a2910cc0f', 9),
       ('8f84b652-e046-400f-a3bd-fdc166ad8359', 50),
       ('f60fcbe0-3d82-4ba0-ba15-a29d05a175e0', 12),
       ('d403da60-17cb-45ed-8bb7-3c26e66477fe', 33);
