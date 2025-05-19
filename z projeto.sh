# 1. Criar projeto
mkdir api-clientes
cd api-clientes
npm init -y

# 2. Instalar dependências
npm install express mongoose body-parser cors

# 3. Criar arquivo server.js (código acima)

# 4. Configurar variáveis de ambiente
# Criar arquivo .env com:
MONGODB_URI=sua_string_de_conexao_do_mongodb_atlas
PORT=3000

# 5. Iniciar servidor local
node server.js