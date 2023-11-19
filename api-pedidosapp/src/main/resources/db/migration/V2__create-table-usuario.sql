CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    login varchar(255) NOT NULL UNIQUE,
    senha varchar(255) NOT NULL,
    role varchar(30) NOT NULL
);