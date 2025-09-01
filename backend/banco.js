// backend/banco.js
const dotenv = require("dotenv");
const oracledb = require("oracledb");
const path = require("path");

dotenv.config();

// __dirname já existe em CommonJS; usamos ele para apontar a pasta da wallet
const walletPath = path.join(__dirname, "..", "config");

// Inicializa a Oracle Client (se você não tiver ORACLE_LIB_DIR configurado, tenta sem libDir)
try {
  if (process.env.ORACLE_LIB_DIR && process.env.ORACLE_LIB_DIR.trim() !== "") {
    oracledb.initOracleClient({
      libDir: process.env.ORACLE_LIB_DIR,
      configDir: walletPath,
    });
  } else {
    // Tenta inicializar apenas com o configDir (ok se sua instalação usar a wallet sem libDir)
    oracledb.initOracleClient({
      configDir: walletPath,
    });
  }
} catch (initErr) {
  // Se falhar aqui, ainda deixamos o erro visível para você — pode ser que falte o cliente Oracle local.
  console.warn("Aviso ao inicializar Oracle Client:", initErr.message || initErr);
}

// String de conexão e credenciais vindas do .env
const connectString = process.env.ORACLE_CONNECT_STRING;
const user = process.env.ORACLE_USER;
const password = process.env.ORACLE_PASSWORD;

// Função de query - usa bind por nome (objeto) para Oracle
async function query(sql, params = {}, options = {}) {
  let connection;
  try {
    connection = await oracledb.getConnection({ user, password, connectString });
    const result = await connection.execute(sql, params, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      autoCommit: options.autoCommit === true, // <<<<
    });
    return result;
  } finally {
    if (connection) await connection.close();
  }
}
module.exports = { query };