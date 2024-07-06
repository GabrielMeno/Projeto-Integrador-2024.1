const express = require("express");
const cors = require("cors");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const { Strategy, ExtractJwt } = require("passport-jwt");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const pgp = require("pg-promise")({});

const usuario = "progII";
const senha = "uffs";
const db = pgp(`postgres://${usuario}:${senha}@localhost:5432/progII`);

const app = express();
app.use(cors());
app.use(express.json());

app.use(
	session({
		secret: '"alguma_frase_muito_doida_pra_servir_de_SECRET',
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
				// busca o usuário no banco de dados
				const user = await db.oneOrNone(
					"SELECT * FROM users WHERE user_id = $1;",
					[username],
				);

				// se não encontrou, retorna erro
				if (!user) {
					return done(null, false, { message: "Usuário incorreto." });
				}

				// verifica se o hash da senha bate com a senha informada
				const passwordMatch = await bcrypt.compare(
					password,
					user.user_password,
				);

				// se senha está ok, retorna o objeto usuário
				if (passwordMatch) {
					console.log("Usuário autenticado!");
					return done(null, user);
				} else {
					// senão, retorna um erro
					return done(null, false, { message: "Senha incorreta." });
				}
			} catch (error) {
				return done(error);
			}
		},
	),
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
					"SELECT * FROM users WHERE user_id = $1;",
					[payload.username],
				);

				if (user) {
					done(null, user);
				} else {
					done(null, false);
				}
			} catch (error) {
				done(error, false);
			}
		},
	),
);

passport.serializeUser(function (user, cb) {
	process.nextTick(function () {
		return cb(null, {
			user_id: user.user_id,
			username: user.user_id,
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
		const token = jwt.sign({ username: req.body.username }, "your-secret-key", {
			expiresIn: "1h",
		});

		res.json({ message: "Login successful", token: token });
	},
);

// app.get("/login", (req, res) => {
// 	res.redirect("/");
// });

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
		const clientes = await db.any("SELECT * FROM clientes;");
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
			"SELECT id, nome, email FROM clientes WHERE id = $1;",
			clienteId,
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
		db.none("INSERT INTO clientes (nome, email) VALUES ($1, $2);", [
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
		const userEmail = req.body.email;
		const userPasswd = req.body.passwd;
		const salt = bcrypt.genSaltSync(saltRounds);
		const hashedPasswd = bcrypt.hashSync(userPasswd, salt);

		console.log(`Email: ${userEmail} - Passwd: ${hashedPasswd}`);
		db.none("INSERT INTO users (user_id, user_password) VALUES ($1, $2);", [
			userEmail,
			hashedPasswd,
		]);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});
