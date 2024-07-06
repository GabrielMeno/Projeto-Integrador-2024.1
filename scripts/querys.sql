CREATE TABLE Cliente (
    ID SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    cpf_cnpj VARCHAR(20),
    telefone VARCHAR(20),
    logradouro VARCHAR(100),
    numero VARCHAR(10),
    complemento VARCHAR(50)
);

CREATE TABLE Usuario (
    cpf VARCHAR(11) PRIMARY KEY,
    rg VARCHAR(15),
    senha VARCHAR(255),
    user_token varchar,
    nome VARCHAR(100),
    nome_de_usuario VARCHAR(50),
    logradouro VARCHAR(100),
    numero VARCHAR(10),
    complemento VARCHAR(50),
    tipo INT
);

CREATE TABLE Ordem_de_Servico (
    Numero SERIAL PRIMARY KEY,
    data DATE,
    data_de_entrega DATE,
    reclamacoes_e_necessidades TEXT,
    status VARCHAR(20),
    valor DECIMAL(10, 2),
    descricao_do_servico TEXT,
    cliente_id INT,
    usuario_cpf VARCHAR(11),
    FOREIGN KEY (cliente_id) REFERENCES Cliente(ID),
    FOREIGN KEY (usuario_cpf) REFERENCES Usuario(cpf)
);

insert into usuario (cpf, rg, senha, nome, nome_de_usuario, logradouro, numero, complemento, tipo) 
values('11050140966', '5879808', '1234', 'marco', 'marcola', 'rua independencia', '1365', 'casa', 1);


UPDATE Usuario
SET senha = '$2b$10$sYK9L3XrW1TNQrrpJX1WZuKk255cb6MQooLdhsX7RxXeVegBad5z2'
WHERE nome_de_usuario = 'marcola';
