CREATE TABLE cliente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome varchar(255) NOT NULL,
    cpf varchar(11),
    cnpj varchar(14),
    contato varchar(20)
);