import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const API_KEY = "usr-yrSrNoO93fSR1uYpd4xQ5pRZMpyl_qhOfWbQQSzBZtc";

app.get("/plants", async (req, res) => {
  try {
    const response = await fetch(`https://trefle.io/api/v1/plants?token=${API_KEY}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    res.status(500).json({ error: "Erro ao acessar API" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));