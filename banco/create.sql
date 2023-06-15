CREATE TABLE usuario(
    Usr_Codigo INT PRIMARY KEY AUTO_INCREMENT,
    Usr_Login VARCHAR(55) NOT NULL,
    Usr_Senha VARCHAR(255) NOT NULL,
    Fun_Codigo INT
);

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
  Pro_Descricao VARCHAR(155) NOT NULL,
  Pro_Unidade VARCHAR(10) NOT NULL,
  Pro_VlrUni FLOAT NOT NULL,
  Pro_QtdEst FLOAT NOT NULL,
  For_Codigo INT NOT NULL
);

CREATE TABLE condicaopagto (
  Cnd_Codigo INT PRIMARY KEY AUTO_INCREMENT,
  Cnd_Descricao VARCHAR(50) NOT NULL,
  Cnd_NrParcelas INT,
  Cnd_Forma INT NOT NULL,
  Cnd_Dias INT
);

CREATE TABLE tipopagto (
  TPg_Codigo INT PRIMARY KEY AUTO_INCREMENT,
  TPg_Descricao VARCHAR(80) NOT NULL
);

CREATE TABLE formapagto (
  FPg_Codigo INT PRIMARY KEY AUTO_INCREMENT,
  FPg_Descricao VARCHAR(50) NOT NULL,
  TPg_Codigo INT NOT NULL
);

CREATE TABLE titulo (
  Tit_Titulo INT NOT NULL,
  Tit_Parcela INT NOT NULL,
  Tit_DataLcto DATE NOT NULL,
  Tit_DataVcto DATE,
  Ped_Codigo INT NOT NULL,
  Ped_VlrTotal FLOAT NOT NULL,
  Tit_VlrTitulo FLOAT NOT NULL,
  Tit_Saldo FLOAT NOT NULL,
  Tit_VlrDesc FLOAT,
  Tit_VlrJurosDia FLOAT,
  Tit_Obs TEXT,
  Cli_Codigo INT NOT NULL,
  Tit_Situacao CHAR(1) NOT NULL,
  Tit_LinkArquivo VARCHAR(255),
  Tit_Cobrado CHAR(1) NOT NULL
);

CREATE TABLE movimentotitulo (
  Mov_Codigo INT PRIMARY KEY AUTO_INCREMENT,
  Mov_DataLcto DATE NOT NULL,
  Mov_Valor FLOAT NOT NULL,
  Tit_Titulo INT NOT NULL,
  Tit_Parcela INT NOT NULL,
  Mov_VlrJuro FLOAT,
  Mov_VlrDesc FLOAT,
  Mov_Obs TEXT
);

CREATE TABLE movimentotitulo_formapgto (
  Mov_Codigo INT NOT NULL,
  FPg_Codigo INT NOT NULL,
  MovFPg_Valor FLOAT NOT NULL
);

CREATE TABLE pedido(
  Ped_Codigo INT PRIMARY KEY AUTO_INCREMENT,
  Cli_Codigo INT NOT NULL,
  Fun_Codigo INT NOT NULL,
  Ped_VlrTotal FLOAT NOT NULL,
  Ped_Situacao CHAR(1) NOT NULL,
  Ped_Data DATE NOT NULL,
  Cnd_Codigo INT NOT NULL
);

CREATE TABLE pedido_itens(
  Ped_Codigo INT NOT NULL,
  Pro_Codigo INT NOT NULL,
  PedItm_Qtd FLOAT NOT NULL,
  PedItm_VlrTotal FLOAT NOT NULL
);

CREATE TABLE configDB(
  Chave VARCHAR(80) NOT NULL
);

ALTER TABLE produto ADD CONSTRAINT fk_produto_fornecedor
FOREIGN KEY(For_Codigo) REFERENCES fornecedor(For_Codigo);

ALTER TABLE formapagto ADD CONSTRAINT fk_forma_tipo
FOREIGN KEY(TPg_Codigo) REFERENCES tipopagto(TPg_Codigo);

ALTER TABLE titulo ADD CONSTRAINT pk_titulo_parcela
PRIMARY KEY(Tit_Titulo, Tit_Parcela);

ALTER TABLE titulo ADD CONSTRAINT fk_titulo_pedido
FOREIGN KEY(Ped_Codigo) REFERENCES pedido(Ped_Codigo);

ALTER TABLE titulo ADD CONSTRAINT fk_titulo_cliente
FOREIGN KEY(Cli_Codigo) REFERENCES cliente(Cli_Codigo);

ALTER TABLE movimentotitulo ADD CONSTRAINT fk_movimento_tituloparcela
FOREIGN KEY(Tit_Titulo, Tit_Parcela) REFERENCES titulo(Tit_Titulo, Tit_Parcela);

ALTER TABLE movimentotitulo_formapgto ADD CONSTRAINT fk_movtitulo_formapagto
FOREIGN KEY(FPg_Codigo) REFERENCES formapagto(FPg_Codigo);

ALTER TABLE pedido ADD CONSTRAINT fk_pedido_cliente
FOREIGN KEY(Cli_Codigo) REFERENCES cliente(Cli_Codigo);

ALTER TABLE pedido ADD CONSTRAINT fk_pedido_funcionario
FOREIGN KEY(Fun_Codigo) REFERENCES funcionario(Fun_Codigo);

ALTER TABLE pedido ADD CONSTRAINT fk_pedido_condicao
FOREIGN KEY(Cnd_Codigo) REFERENCES condicaopagto(Cnd_Codigo);

ALTER TABLE pedido_itens ADD CONSTRAINT pk_pedido_produto
PRIMARY KEY (Ped_Codigo, Pro_Codigo);

ALTER TABLE pedido_itens ADD CONSTRAINT fk_pedidoitens_pedido
FOREIGN KEY (Ped_Codigo) REFERENCES pedido(Ped_Codigo);

ALTER TABLE pedido_itens ADD CONSTRAINT fk_pedidoitens_produto
FOREIGN KEY (Pro_Codigo) REFERENCES produto(Pro_Codigo);

ALTER TABLE usuario ADD CONSTRAINT fk_usuario_funcionario
FOREIGN KEY(Fun_Codigo) REFERENCES funcionario(Fun_Codigo);

DELIMITER $$

CREATE TRIGGER before_pedido_delete 
BEFORE DELETE ON pedido FOR EACH ROW
BEGIN
    DELETE FROM pedido_itens WHERE Ped_Codigo = OLD.Ped_Codigo;
END$$    

DELIMITER ;