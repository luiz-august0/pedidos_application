CREATE TABLE cliente(
  Cli_Codigo INT PRIMARY KEY AUTO_INCREMENT,
  Cli_Nome VARCHAR(60) NOT NULL,
  Cli_CNPJ VARCHAR(14) UNIQUE,
  Cli_CPF VARCHAR(11) UNIQUE,
  Cli_Contato VARCHAR(20)
);

CREATE TABLE fornecedor(
  For_Codigo INT PRIMARY KEY AUTO_INCREMENT,
  For_Nome VARCHAR(60) NOT NULL,
  For_RazaoSocial VARCHAR(100),
  For_CNPJ VARCHAR(14) UNIQUE,
  For_CPF VARCHAR(11) UNIQUE,
  For_Contato VARCHAR(20)
);

CREATE TABLE funcionario(
  Fun_Codigo INT PRIMARY KEY AUTO_INCREMENT,
  Fun_Nome VARCHAR(60) NOT NULL,
  Fun_CPF VARCHAR(11) UNIQUE,
  Fun_Contato VARCHAR(20)
);

CREATE TABLE produto(
  Pro_Codigo INT PRIMARY KEY AUTO_INCREMENT,
  Pro_Descricao VARCHAR(55) NOT NULL,
  Pro_Unidade VARCHAR(10) NOT NULL,
  Pro_VlrUni FLOAT NOT NULL,
  Pro_QtdEst FLOAT NOT NULL
);

CREATE TABLE pedido(
  Ped_Codigo INT PRIMARY KEY AUTO_INCREMENT,
  Cli_Codigo INT NOT NULL,
  For_Codigo INT NOT NULL,
  Fun_Codigo INT NOT NULL,
  Ped_VlrTotal FLOAT NOT NULL,
  Ped_Situacao CHAR(1) NOT NULL
);

CREATE TABLE pedido_itens(
  Ped_Codigo INT NOT NULL,
  Pro_Codigo INT NOT NULL,
  PedItm_Qtd FLOAT NOT NULL,
  PedItm_VlrTotal FLOAT NOT NULL
);

ALTER TABLE pedido ADD CONSTRAINT fk_cli_codigo
FOREIGN KEY(Cli_Codigo) REFERENCES cliente(Cli_Codigo);

ALTER TABLE pedido ADD CONSTRAINT fk_for_codigo
FOREIGN KEY(For_Codigo) REFERENCES fornecedor(For_Codigo);

ALTER TABLE pedido ADD CONSTRAINT fk_fun_codigo
FOREIGN KEY(Fun_Codigo) REFERENCES funcionario(Fun_Codigo);

ALTER TABLE pedido_itens ADD CONSTRAINT pk_pedido_produto
PRIMARY KEY (Ped_Codigo, Pro_Codigo);