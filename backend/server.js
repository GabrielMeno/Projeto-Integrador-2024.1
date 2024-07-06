const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const pgp = require("pg-promise")({});

const usuario = "postgres";
const senha = "1234";
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
                console.log("Tentando autenticar usuário:", username);
                const user = await db.oneOrNone(
                    "SELECT * FROM Usuario WHERE nome_de_usuario = $1;",
                    [username]
                );

                if (!user) {
                    console.log("Usuário não encontrado:", username);
                    return done(null, false, { message: "Usuário incorreto." });
                }

                const passwordMatch = await bcrypt.compare(
                    password,
                    user.senha
                );

                if (passwordMatch) {
                    console.log("Usuário autenticado!");
                    return done(null, user);
                } else {
                    console.log("Senha incorreta para usuário:", username);
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
            { cpf: req.user.cpf }, // payload
            "your-secret-key", // chave secreta
            { expiresIn: "1h" } // opções
        );

        console.log("Token gerado:", token); // Adicione esta linha para verificar o token gerado

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
        console.log("Retornando todos clientes.");
        res.json(clientes).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.get("/cliente", requireJWTAuth, async (req, res) => {
    try {
        const clienteId = parseInt(req.query.id);
        console.log(`Retornando ID: ${clienteId}.`);
        const clientes = await db.one(
            "SELECT id, nome, email FROM Cliente WHERE id = $1;",
            clienteId
        );
        res.json(clientes).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.post("/cliente", requireJWTAuth, async (req, res) => {
    try {
        const clienteNome = req.body.nome;
        const clienteEmail = req.body.email;
        console.log(`Nome: ${clienteNome} - Email: ${clienteEmail}`);
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

    console.log('Query:', query);
    console.log('Query Params:', queryParams);

    try {
        const usuarios = await db.any(query, queryParams);
        console.log('Usuários encontrados:', usuarios);
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
