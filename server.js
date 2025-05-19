// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/clientesdb';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexão com MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB Atlas!'))
  .catch(err => console.error('Erro na conexão:', err));

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 30000, // 30 segundos
  socketTimeoutMS: 45000
});

// Modelo de Cliente
const Cliente = mongoose.model('Cliente', new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefone: String,
  endereco: {
    rua: String,
    cidade: String,
    estado: String,
    cep: String
  },
  dataCadastro: { type: Date, default: Date.now }
}));

// Rotas da API
// Adicione antes das outras rotas
app.get('/', (req, res) => {
  res.json({
    message: "API de Clientes funcionando!",
    endpoints: {
      clientes: "/clientes"
    }
  });
});
// GET /clientes - Listar todos os clientes
app.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /clientes/:id - Obter um cliente específico
app.get('/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /clientes - Criar novo cliente
app.post('/clientes', async (req, res) => {
  const cliente = new Cliente({
    nome: req.body.nome,
    email: req.body.email,
    telefone: req.body.telefone,
    endereco: req.body.endereco
  });

  try {
    const novoCliente = await cliente.save();
    res.status(201).json(novoCliente);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /clientes/:id - Atualizar cliente
app.put('/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json(cliente);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /clientes/:id - Remover cliente
app.delete('/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json({ message: 'Cliente removido com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
