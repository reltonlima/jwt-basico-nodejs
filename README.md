# jwt-basico-nodejs
JSON Web Token (JWT) - Exemplo de Implementação
Esta é uma documentação sobre como implementar autenticação baseada em JWT (JSON Web Token) usando Node.js e Express.

O que é JWT?

JWT (é um padrão aberto para transmitir informações entre partes de forma segura. O token é assinado, garantindo a integridade dos dados.

Estrutura do JWT

Um JWT é composto por três partes:

Header: Metadados do token.

Payload: Dados transmitidos (claims).

Signature: Garantia de que o token não foi alterado.

Exemplo:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

Exemplo de Implementação

Aqui está um exemplo básico de como usar JWT em uma aplicação Node.js:

1. Configurar o projeto

Crie um diretório para o projeto e instale os pacotes necessários:
```
mkdir jwt-auth-example
cd jwt-auth-example
npm init -y
npm install express jsonwebtoken body-parser dotenv
```
Inicie o servidor:
```
node server.js
```
Login:
Envie uma requisição POST para http://localhost:3000/login com o corpo:
```
{
  "username": "admin",
  "password": "123456"
}
```
Resposta esperada:
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
Acessar rota protegida:
Envie uma requisição GET para http://localhost:3000/protected com o cabeçalho:

Teste com token inválido ou expirado:
```
{
  "message": "Token inválido"
}

Acessar rota protegida:
Envie uma requisição GET para http://localhost:3000/protected com o cabeçalho:
```
Authorization: Bearer <seu_token>
Resposta esperada:
```
{
  "message": "Você acessou uma rota protegida!",
  "user": {
    "id": 1,
    "username": "admin",
    "iat": 1672509193,
    "exp": 1672512793
  }
}
```