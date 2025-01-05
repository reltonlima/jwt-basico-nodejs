require('dotenv').config(); // Para carregar variáveis de ambiente
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware para processar JSON
app.use(bodyParser.json());

// "Banco de dados" fictício
const users = [
  { id: 1, username: 'admin', password: '123456' },
  { id: 2, username: 'user', password: 'password' },
];

// Secret para assinatura do token (salve isso em um local seguro)
const JWT_SECRET = process.env.JWT_SECRET || 'sAeaQst*(&¨%$/89*-+!@#64528#$@!%$#';

// Rota de login (gera o token)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verifica se o usuário existe
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  // Gera o token
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: '1h', // O token expira em 1 hora
  });

  res.json({ token });
});

// Middleware para proteger rotas (verifica o token)
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    req.user = user; // Adiciona o usuário à requisição
    next();
  });
}

// Rota protegida
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Você acessou uma rota protegida!', user: req.user });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
