import express from "express";
import cors from "cors";
import sequelize from "./db.js"; // <-- importa a conexão Sequelize
import Usuario from "./models/Usuario.js"; // <-- importa o model

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/assets", express.static("assets"));

app.get("/favicon.ico", (req, res) => res.sendStatus(204)); // sem conteúdo

// Health Check
app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate(); // testa a conexão com o banco
    res.json({
      status: "✅ API ativa",
      database: "✅ Conectado",
      message: "Use /usuarios para ver os dados.",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "✅ API ativa",
      database: "❌ Erro de conexão",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

const port = process.env.PORT || 3306;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
