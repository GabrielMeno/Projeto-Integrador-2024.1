const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");  
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const pgp = require("pg-promise")({});

const usuario = "postgres";
const senha = "postgres";
const db = pgp(`postgres://${usuario}:${senha}@localhost:5432/topduo`);

const app = express();
app.use(cors());
app.use(express.json());

app.use(
    session({
        secret: "alguma_frase_muito_doida_pra_servir_de_SECRET",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true },
    }),
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
        },
        async (username, password, done) => {
            try {
                const user = await db.oneOrNone(
                    "SELECT * FROM Usuario WHERE nome_de_usuario = $1;",
                    [username]
                );

                if (!user) {
                    return done(null, false, { message: "Usuário não encontrado." });
                }

                const passwordMatch = await bcrypt.compare(
                    password,
                    user.senha
                );

                if (passwordMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Senha incorreta." });
                }
            } catch (error) {
                console.log("Erro ao tentar autenticar usuário:", error);
                return done(error);
            }
        }
    )
);

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "your-secret-key",
        },
        async (payload, done) => {
            try {
                const user = await db.oneOrNone(
                    "SELECT * FROM Usuario WHERE cpf = $1;",
                    [payload.cpf]
                );

                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (error) {
                done(error, false);
            }
        }
    )
);

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, {
            cpf: user.cpf,
            nome_de_usuario: user.nome_de_usuario,
            tipo: user.tipo
        });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

const requireJWTAuth = passport.authenticate("jwt", { session: false });

app.listen(3010, () => console.log("Servidor rodando na porta 3010."));

app.post(
    "/login",
    passport.authenticate("local", { session: false }),
    (req, res) => {
        const token = jwt.sign(
            { cpf: req.user.cpf, tipo: req.user.tipo }, 
            "your-secret-key", 
            { expiresIn: "1h" } 
        );

        res.json({ message: "Login successful", token: token });
    }
);

app.post("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.get("/clientes", requireJWTAuth, async (req, res) => {
    try {
        const clientes = await db.any("SELECT * FROM Cliente;");
        res.json(clientes).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.get("/cliente", requireJWTAuth, async (req, res) => {
    const { cpf } = req.query;


    if (!cpf) {
        return res.status(400).json({ error: 'CPF é obrigatório' });
    }

    try {
        const cliente = await db.oneOrNone("SELECT * FROM Cliente WHERE cpf_cnpj = $1;", [cpf]);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.status(200).json(cliente);
    } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        res.status(500).json({ error: 'Erro ao buscar cliente', detalhes: error.message });
    }
});

app.post("/cliente", requireJWTAuth, async (req, res) => {
    try {
        const clienteNome = req.body.nome;
        const clienteEmail = req.body.email;
        db.none("INSERT INTO Cliente (nome, email) VALUES ($1, $2);", [
            clienteNome,
            clienteEmail,
        ]);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.put("/cliente", requireJWTAuth, async (req, res) => {
    const { cpf } = req.query;
    const { nome, email, telefone, logradouro, numero, complemento } = req.body;

    try {
        await db.none(
            `UPDATE Cliente SET nome = $1, email = $2, telefone = $3, logradouro = $4, numero = $5, complemento = $6 WHERE cpf_cnpj = $7`,
            [nome, email, telefone, logradouro, numero, complemento, cpf]
        );
        res.sendStatus(200);
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        res.status(400).json({ error: 'Erro ao atualizar cliente', detalhes: error.message });
    }
});


app.post("/novoUsuario", async (req, res) => {
    const saltRounds = 10;
    const { nome, nome_de_usuario, cargo, senha, cpf, rg, permissoes } = req.body;

    try {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPasswd = bcrypt.hashSync(senha, salt);

        await db.none(
            "INSERT INTO Usuario (cpf, rg, senha, nome, nome_de_usuario, cargo, permissoes, tipo) VALUES ($1, $2, $3, $4, $5, $6, $7, 2);",
            [cpf, rg, hashedPasswd, nome, nome_de_usuario, cargo, permissoes]
        );
        res.sendStatus(200);
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.sendStatus(400);
    }
});

app.get("/consultarUsuarios", requireJWTAuth, async (req, res) => {
    const { nome_de_usuario, cpf, cargo } = req.query;

    let query = `SELECT * FROM Usuario WHERE 1=1`;
    let queryParams = [];

    if (nome_de_usuario) {
        query += ` AND nome_de_usuario ILIKE $${queryParams.length + 1}`;
        queryParams.push(`%${nome_de_usuario}%`);
    }
    if (cpf) {
        query += ` AND cpf ILIKE $${queryParams.length + 1}`;
        queryParams.push(`%${cpf}%`);
    }
    if (cargo) {
        query += ` AND cargo ILIKE $${queryParams.length + 1}`;
        queryParams.push(`%${cargo}%`);
    }

    try {
        const usuarios = await db.any(query, queryParams);
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.sendStatus(400);
    }
});

app.get("/usuario", requireJWTAuth, async (req, res) => {
    const { cpf } = req.query;

    try {
        const user = await db.one("SELECT * FROM Usuario WHERE cpf = $1", [cpf]);
        res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.sendStatus(400);
    }
});

app.put("/usuario", requireJWTAuth, async (req, res) => {
    const { cpf } = req.query;
    const { nome, nome_de_usuario, cargo, rg, senha, permissoes } = req.body;


    try {
        const fields = [
            { field: 'nome', value: nome },
            { field: 'nome_de_usuario', value: nome_de_usuario },
            { field: 'cargo', value: cargo },
            { field: 'rg', value: rg },
            { field: 'permissoes', value: permissoes }
        ];

        if (senha) {
            const hashedPasswd = bcrypt.hashSync(senha, bcrypt.genSaltSync(10));
            fields.push({ field: 'senha', value: hashedPasswd });
        }

        const setClause = fields
            .filter(({ value }) => value !== undefined)
            .map(({ field }, index) => `${field} = $${index + 1}`)
            .join(', ');

        const values = fields
            .filter(({ value }) => value !== undefined)
            .map(({ value }) => value);

        values.push(cpf);

        await db.none(
            `UPDATE Usuario SET ${setClause} WHERE cpf = $${values.length}`,
            values
        );

        res.status(200).send('Usuário atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.sendStatus(400);
    }
});


app.get("/funcionarios", requireJWTAuth, async (req, res) => {
    try {
        const funcionarios = await db.any("SELECT cpf, nome FROM Usuario WHERE tipo = 2;");
        res.status(200).json(funcionarios);
    } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
        res.sendStatus(400);
    }
});

app.post("/novaOrdem", requireJWTAuth, async (req, res) => {
    const {
        nome,
        endereco: { logradouro, numero, complemento },
        email,
        telefone,
        cpfCnpj,
        data,
        dataDeEntrega,
        status,
        reclamacoes,
        pecas,
        descricao,
        funcionario,
        valor
    } = req.body;

  
    try {
        if (!nome || !email || !telefone || !cpfCnpj || !data || !dataDeEntrega || !funcionario || !valor) {
            throw new Error('Campos obrigatórios estão faltando');
        }

        let cliente = await db.oneOrNone("SELECT cpf_cnpj FROM Cliente WHERE cpf_cnpj = $1;", [cpfCnpj]);

        if (!cliente) {
            cliente = await db.one(
                `INSERT INTO Cliente (nome, email, cpf_cnpj, telefone, logradouro, numero, complemento)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING cpf_cnpj;`,
                [nome, email, cpfCnpj, telefone, logradouro, numero, complemento]
            );
        }

        await db.none(
            `INSERT INTO Ordem_de_Servico (data, data_de_entrega, reclamacoes_e_necessidades, status, valor, descricao_do_servico, cliente_cpf_cnpj, usuario_cpf)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
            [data, dataDeEntrega, reclamacoes, status, parseFloat(valor), descricao, cliente.cpf_cnpj, funcionario]
        );

        res.sendStatus(200);
    } catch (error) {
        console.error('Erro ao cadastrar ordem:', error);
        res.status(400).json({ error: 'Erro ao cadastrar ordem', detalhes: error.message });
    }
});


app.get("/consultarOrdens", requireJWTAuth, async (req, res) => {
    const { dataInicio, dataFim, status } = req.query;

    let query = `
        SELECT o.*, c.nome AS cliente_nome
        FROM Ordem_de_Servico o
        JOIN Cliente c ON o.cliente_cpf_cnpj = c.cpf_cnpj
        WHERE 1=1
    `;
    let queryParams = [];

    if (dataInicio) {
        query += ` AND o.data >= $${queryParams.length + 1}`;
        queryParams.push(dataInicio);
    }

    if (dataFim) {
        query += ` AND o.data <= $${queryParams.length + 1}`;
        queryParams.push(dataFim);
    }

    if (status) {
        query += ` AND o.status = $${queryParams.length + 1}`;
        queryParams.push(status);
    }

    try {
        const ordens = await db.any(query, queryParams);
        res.status(200).json(ordens);
    } catch (error) {
        console.error('Erro ao buscar ordens:', error);
        res.status(400).json({ error: 'Erro ao buscar ordens' });
    }
});



app.get("/ordem/:numero", requireJWTAuth, async (req, res) => {
    const { numero } = req.params;

    try {
        const ordem = await db.oneOrNone(`
            SELECT o.*, c.nome AS cliente_nome, c.logradouro AS cliente_logradouro, c.numero AS cliente_numero,
                   c.complemento AS cliente_complemento, c.email AS cliente_email, c.telefone AS cliente_telefone,
                   u.nome AS funcionario_nome
            FROM Ordem_de_Servico o
            JOIN Cliente c ON o.cliente_cpf_cnpj = c.cpf_cnpj
            JOIN Usuario u ON o.usuario_cpf = u.cpf
            WHERE o.numero = $1
        `, [numero]);

        if (ordem) {
            res.status(200).json(ordem);
        } else {
            res.status(404).json({ error: "Ordem não encontrada" });
        }
    } catch (error) {
        console.error('Erro ao buscar ordem:', error);
        res.status(400).json({ error: 'Erro ao buscar ordem' });
    }
});

app.put("/ordem/:numero", requireJWTAuth, async (req, res) => {
    const { numero } = req.params;
    const { status, data_de_entrega, descricao_do_servico, pecas } = req.body;

    try {
        await db.none(`
            UPDATE Ordem_de_Servico
            SET status = $1, data_de_entrega = $2, descricao_do_servico = $3, pecas = $4
            WHERE numero = $5
        `, [status, data_de_entrega, descricao_do_servico, pecas, numero]);

        res.status(200).json({ message: "Ordem atualizada com sucesso" });
    } catch (error) {
        console.error('Erro ao atualizar ordem:', error);
        res.status(400).json({ error: 'Erro ao atualizar ordem' });
    }
});



app.delete("/ordem/:numero", requireJWTAuth, async (req, res) => {
    const { numero } = req.params;

    try {
        await db.none("DELETE FROM Ordem_de_Servico WHERE numero = $1", [numero]);
        res.status(200).json({ message: "Ordem excluída com sucesso" });
    } catch (error) {
        console.error('Erro ao excluir ordem:', error);
        res.status(400).json({ error: 'Erro ao excluir ordem', detalhes: error.message });
    }
});


