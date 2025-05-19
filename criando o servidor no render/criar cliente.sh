# Criar cliente
curl -X POST -H "Content-Type: application/json" -d '{
  "nome": "João Silva",
  "email": "joao@example.com",
  "telefone": "11999999999",
  "endereco": {
    "rua": "Rua das Flores, 123",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01234-567"
  }
}' http://localhost:3000/clientes

# Listar clientes
curl http://localhost:3000/clientes

# Atualizar cliente
curl -X PUT -H "Content-Type: application/json" -d '{
  "nome": "João Silva Santos",
  "telefone": "11988888888"
}' http://localhost:3000/clientes/ID_DO_CLIENTE

# Deletar cliente
curl -X DELETE http://localhost:3000/clientes/ID_DO_CLIENTE