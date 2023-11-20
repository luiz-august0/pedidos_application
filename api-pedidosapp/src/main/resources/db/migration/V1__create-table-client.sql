CREATE TABLE client (
    id SERIAL UNIQUE PRIMARY KEY,
    name varchar(255) NOT NULL,
    cpf varchar(11) UNIQUE,
    cnpj varchar(14) UNIQUE,
    contact varchar(20)
);