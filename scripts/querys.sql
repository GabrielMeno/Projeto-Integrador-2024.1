CREATE TABLE Cliente (
    cpf_cnpj VARCHAR(20) PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    telefone VARCHAR(20),
    logradouro VARCHAR(100),
    numero VARCHAR(10),
    complemento VARCHAR(50)
);

CREATE TABLE Usuario (
    cpf VARCHAR(11) PRIMARY KEY,
    rg VARCHAR(15),
    senha VARCHAR(255),
    user_token VARCHAR(255),
    nome VARCHAR(100),
    nome_de_usuario VARCHAR(50),
    cargo VARCHAR(100),
    permissoes TEXT,
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
    cliente_cpf_cnpj VARCHAR(20),
    usuario_cpf VARCHAR(11),
    FOREIGN KEY (cliente_cpf_cnpj) REFERENCES Cliente(cpf_cnpj),
    FOREIGN KEY (usuario_cpf) REFERENCES Usuario(cpf)
);

INSERT INTO Usuario (cpf, rg, senha, nome, nome_de_usuario, cargo, permissoes, tipo) 
VALUES ('11050140966', '5879808', '$2b$10$sYK9L3XrW1TNQrrpJX1WZuKk255cb6MQooLdhsX7RxXeVegBad5z2', 'marco', 'marcola', 'Engenheiro', 'Admin', 1);
