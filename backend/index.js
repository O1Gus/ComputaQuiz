// backend/index.js
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./banco');
const { ref } = require('process');
require('dotenv').config();
console.log('CALLBACK_URL (ENV) =', process.env.CALLBACK_URL);

const app = express();
const port = process.env.PORT || 3000;

// se o app estiver atrás de um proxy (ngrok), habilite trust proxy
app.set('trust proxy', 1);

// ----------------------------
// CONFIGURAÇÕES EXPRESS
// ----------------------------
app.use(express.static(path.join(__dirname, "../"))); // serve frontend
app.use(express.json());



// ----------------------------
// CONFIGURAÇÕES DE SESSÃO
// ----------------------------
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,   // <<<<< ALTERAR PARA FALSE
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24*60*60*1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// ----------------------------
// SERIALIZAÇÃO / DESSERIALIZAÇÃO
// ----------------------------
passport.serializeUser((user, done) => {
  const gid = user.google_id || user.GOOGLE_ID; // <<<<
  done(null, gid);
});

passport.deserializeUser(async (google_id, done) => {
  try {
    const r = await db.query(
      "SELECT id_usuario, google_id, nickname FROM usuarios WHERE google_id = ?",
      [google_id]
    );
    if (!r[0]) return done(null, null);
    const u = r[0];
    done(null, { id_usuario: u.id_usuario, google_id: u.google_id, nickname: u.nickname });
  } catch (e) {
    done(e);
  }
});


// ----------------------------
// GOOGLE STRATEGY
// ----------------------------
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const google_id = profile.id;
      const email = profile.emails?.[0]?.value || null;
      const nome_completo = profile.displayName || null;

      const result = await db.query(
        "UPDATE usuarios SET nickname = ? WHERE google_id = ?",
        [nickname, google_id]
      );
      if (result.affectedRows > 0) {
        res.json({ success: true, message: `Nickname '${nickname}' salvo com sucesso!` });
      } else {
        res.status(404).json({ success: false, message: "Usuário não encontrado." });
      }

      let user;
      if (result.length === 0) {
        // Gera nickname temporário
        let nickname_temp = (google_id || "UNQ").slice(0,3).padEnd(3,'X');

        await db.query(
          `INSERT INTO usuarios (google_id, email, nome_completo, nickname)
          VALUES (?, ?, ?, ?)`,
          [google_id, email, nome_completo, nickname_temp]
        );

        const inserted = await db.query(
          `SELECT id_usuario, google_id, nickname FROM usuarios WHERE google_id = ?`,
          [google_id]
        );

        const r = inserted[0];
        user = { id_usuario: r.id_usuario, google_id: r.google_id, nickname: r.nickname };

      } else {
        const r = result[0];
        user = { id_usuario: r.id_usuario, google_id: r.google_id, nickname: r.nickname };
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// ----------------------------
// ROTAS GOOGLE LOGIN
// ----------------------------
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    const google_id = req.user.google_id || req.user.GOOGLE_ID; // ✅ aqui req existe
    try {
      console.log("Usuário autenticado no callback:", req.user);
      
      // Atualiza nickname para 'UNQ' se não existir
      if (!req.user.nickname || req.user.nickname === 'UNQ') {
        await db.query(
          "UPDATE usuarios SET nickname = 'UNQ' WHERE google_id = ?",
          [req.user.google_id]
        );
        console.log("Nickname definido como UNQ para:", req.user.google_id);
      }
      
      // Redireciona para cadastro
      res.redirect("/cadastro");
    } catch (err) {
      console.error("Erro no callback do Google:", err);
      res.redirect("/");
    }
  }
);

app.get("/cadastro", (req, res) => {
  if (!req.isAuthenticated()) return res.redirect("/");
  res.sendFile(path.join(__dirname, "../cadastro.html"));
});

// ----------------------------
// ROTA: Inicializar DB
// ----------------------------
app.get('/api/inicializar-db', async (req, res) => {
  try {
    const createTableSQL1 = `
    CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE NOT NULL,
    nickname VARCHAR(3) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE,
    nome_completo VARCHAR(100)
    )`;
    await db.query(createTableSQL1);
    
    const createTableSQL2 = `
    CREATE TABLE IF NOT EXISTS partidas (
    id_partida INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    pontuacao INT DEFAULT 0 NOT NULL,
    vidas_restantes INT NOT NULL,
    data_partida TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
    )`;
    await db.query(createTableSQL2);
    
    const createTableSQL3 = `
    CREATE TABLE IF NOT EXISTS perguntas (
    id_pergunta INT AUTO_INCREMENT PRIMARY KEY,
    enunciado VARCHAR(4000) NOT NULL,
    nivel_dificuldade VARCHAR(20),
    categoria VARCHAR(50)
    )`;
    await db.query(createTableSQL3);
    
    const createTableSQL4 = `
    CREATE TABLE IF NOT EXISTS alternativas (
    id_alternativa INT AUTO_INCREMENT PRIMARY KEY,
    id_pergunta INT NOT NULL,
    texto VARCHAR(4000) NOT NULL,
    correta BOOLEAN NOT NULL,
    FOREIGN KEY (id_pergunta) REFERENCES perguntas(id_pergunta) ON DELETE CASCADE
    )`;
    await db.query(createTableSQL4);    

    res.json({ success: true, message: "Todas as tabelas foram criadas com sucesso!" });
  } catch (err) {
    if (err.errorNum === 955) {
      return res.json({ success: true, message: "Uma ou mais tabelas já existem. Nenhuma ação necessária." });
    }
    console.error("Erro ao inicializar o banco de dados:", err);
    res.status(500).json({ success: false, erro: err.message });
  }
});

// ----------------------------
// ROTA: Salvar Nickname
// ----------------------------
app.post('/api/salvar-nickname', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Usuário não autenticado." });
    }

    const google_id = req.user.google_id || req.user.GOOGLE_ID;
    const { nickname } = req.body;

    if (!nickname || nickname.length !== 3) {
      return res.status(400).json({ success: false, message: "Nickname inválido. Deve ter 3 caracteres." });
    }

    const existingNickname = await db.query(
      "SELECT COUNT(*) AS nickname_count FROM usuarios WHERE nickname = ?",
      [nickname]
    );
    if (existingNickname[0].nickname_count > 0) {
      return res.status(409).json({ success: false, message: "Nickname já está em uso." });
    }

    const update = await db.query(
      "UPDATE usuarios SET nickname = ? WHERE google_id = ?",
      [nickname, google_id]
    );

    if (update.affectedRows > 0) {
      return res.json({ success: true, message: `Nickname '${nickname}' salvo com sucesso!` });
    }
    return res.status(404).json({ success: false, message: "Usuário não encontrado." });

  } catch (error) {
    console.error('Erro ao salvar nickname:', error);
    res.status(500).json({ success: false, message: "Erro interno do servidor ao salvar o nickname." });
  }
});


// ----------------------------
// ROTA PADRÃO
// ----------------------------
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// ----------------------------
// START SERVER
// ----------------------------
app.listen(3000, '0.0.0.0', () => console.log("Servidor rodando!"));
