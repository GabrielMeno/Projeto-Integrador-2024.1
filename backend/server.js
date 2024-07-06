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
                // Busca o usuário no banco de dados
                const user = await db.oneOrNone(
                    "SELECT * FROM Usuario WHERE nome_de_usuario = $1;",
                    [username]
                );

                // Se não encontrou, retorna erro
                if (!user) {
                    return done(null, false, { message: "Usuário incorreto." });
                }

                // Verifica se o hash da senha bate com a senha informada
                const passwordMatch = await bcrypt.compare(
                    password,
                    user.senha
                );

                // Se senha está ok, retorna o objeto usuário
                if (passwordMatch) {
                    console.log("Usuário autenticado!");
                    return done(null, user);
                } else {
                    // Senão, retorna um erro
                    return done(null, false, { message: "Senha incorreta." });
                }
            } catch (error) {
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
        // Cria o token JWT
        const token = jwt.sign(
            { cpf: req.user.cpf },
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
    try {
        const userName = req.body.nome_de_usuario;
        const userPasswd = req.body.senha;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPasswd = bcrypt.hashSync(userPasswd, salt);

        console.log(`Username: ${userName} - Password: ${hashedPasswd}`);
        db.none(
            "INSERT INTO Usuario (nome_de_usuario, senha) VALUES ($1, $2);",
            [userName, hashedPasswd]
        );
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});
