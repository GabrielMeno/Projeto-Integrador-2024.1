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
    pecas TEXT,
    valor DECIMAL(10, 2),
    descricao_do_servico TEXT,
    cliente_cpf_cnpj VARCHAR(20),
    usuario_cpf VARCHAR(11),
    FOREIGN KEY (cliente_cpf_cnpj) REFERENCES Cliente(cpf_cnpj),
    FOREIGN KEY (usuario_cpf) REFERENCES Usuario(cpf)
);

/*Comando para inserir usuarios administradores no banco com o hash gerado pelo arquivo hashGen*/
INSERT INTO Usuario (cpf, rg, senha, nome, nome_de_usuario, cargo, permissoes, tipo) 
VALUES ('11050140966', '5879808', '$2b$10$sYK9L3XrW1TNQrrpJX1WZuKk255cb6MQooLdhsX7RxXeVegBad5z2', 'marco', 'marcoal', 'Admin', 'Admin', 1);

/*Comando para buscar usuario por nome de usuário com o parametro recebido*/
SELECT * FROM Usuario WHERE nome_de_usuario = $1;


/*Comando para buscar usuario por cpf com o parametro recebido*/
SELECT * FROM Usuario WHERE cpf = $1;


/*Comando para inserir um cliente no banco com os dados recebidos por parametro*/
INSERT INTO Cliente (nome, email, cpf_cnpj, telefone, logradouro, numero, complemento)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING cpf_cnpj;


/*Comando para buscar todos os clientes*/
SELECT * FROM Cliente;


/*Comando para buscar cliente por cpf ou cnpj usando o parametro recebido*/
SELECT * FROM Cliente WHERE cpf_cnpj = $1;


/*Comando para buscar o cpf ou cnpj de cliente por cpf ou cnpj usando o parametro recebido*/
SELECT cpf_cnpj FROM Cliente WHERE cpf_cnpj = $1;


/*Comando para atualizar cliente por cpf ou cnpj usando os parametros recebidos*/
UPDATE Cliente SET nome = $1, email = $2, telefone = $3, logradouro = $4, numero = $5, complemento = $6 WHERE cpf_cnpj = $7


/*Comando para inserir um novo usuário funcionário usando os parametros recebidos*/
INSERT INTO Usuario (cpf, rg, senha, nome, nome_de_usuario, cargo, permissoes, tipo) VALUES ($1, $2, $3, $4, $5, $6, $7, 2);


/*Comando para buscar usuarios por nome de usuario, cpd ou cargo(dependendo do que for selecionado)*/
SELECT * FROM Usuario WHERE 1=1 AND nome_de_usuario ILIKE $ AND cpf ILIKE $ AND cargo ILIKE $


/*Comando para buscar usuarios por cpf com o parametro recebido*/
SELECT * FROM Usuario WHERE cpf = $1


/*Comando para atualizar campos do usuario por cpf com os parametros recebidos*/
UPDATE Usuario SET $ WHERE cpf = $


/*Comando para buscar cpf e nome de usuarios do tipo 2(funcionarios)*/
SELECT cpf, nome FROM Usuario WHERE tipo = 2;


/*Comando para inserir uma nova ordem de serviço com os parametros recebidos*/
INSERT INTO Ordem_de_Servico (data, data_de_entrega, reclamacoes_e_necessidades, status, valor, descricao_do_servico, cliente_cpf_cnpj, usuario_cpf)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8);


/*Comando para buscar ordens de serviço por cliente, data ou status(dependendo do que for passado como parametro)*/
SELECT o.*, c.nome AS cliente_nome
FROM Ordem_de_Servico o
JOIN Cliente c ON o.cliente_cpf_cnpj = c.cpf_cnpj
WHERE 1=1
AND o.data >= $
AND o.data <= $
AND o.status = $


/*Comando para buscar ordens de serviço e o cliente e o usuario relacionados a ela por numero*/
SELECT o.*, c.nome AS cliente_nome, c.logradouro AS cliente_logradouro, c.numero AS cliente_numero,
                   c.complemento AS cliente_complemento, c.email AS cliente_email, c.telefone AS cliente_telefone,
                   u.nome AS funcionario_nome
FROM Ordem_de_Servico o
JOIN Cliente c ON o.cliente_cpf_cnpj = c.cpf_cnpj
JOIN Usuario u ON o.usuario_cpf = u.cpf
WHERE o.numero = $1


/*Comando para atualizar campos de ordem de serviço por numero*/
UPDATE Ordem_de_Servico
SET status = $1, data_de_entrega = $2, descricao_do_servico = $3, pecas = $4
WHERE numero = $5


/*Comando para excluir uma ordem de serviço por numero*/
DELETE FROM Ordem_de_Servico WHERE numero = $1