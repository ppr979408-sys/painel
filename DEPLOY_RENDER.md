# Deploy no Render - Configuração MySQL

## Passos para Deploy

### 1. Preparar o Repositório
- Certifique-se de que todos os arquivos estão commitados
- O arquivo `render.yaml` já está configurado
- O projeto foi configurado para usar apenas MySQL (sem fallback)
- Arquivo `Dockerfile` criado para compatibilidade com Render
- Arquivo `.node-version` especifica Node.js 18

### 2. Configurar Variáveis de Ambiente no Render

No painel do Render, configure as seguintes variáveis secretas:

```
MYSQL_HOST=seu_host_infinityfree
MYSQL_USER=seu_usuario_mysql
MYSQL_PASSWORD=sua_senha_mysql
MYSQL_DATABASE=nome_do_banco
```

### 3. Estrutura do Banco MySQL

O banco deve conter as seguintes tabelas:

#### Tabela: clientes
```sql
CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo_loja VARCHAR(50) UNIQUE NOT NULL,
  nome VARCHAR(100) NOT NULL,
  sobrenome VARCHAR(100) NOT NULL,
  nome_empresa VARCHAR(200) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  telefone VARCHAR(20),
  endereco TEXT,
  cidade VARCHAR(100),
  uf VARCHAR(2),
  status VARCHAR(1) DEFAULT '1',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Tabela: cadastrofeed
```sql
CREATE TABLE cadastrofeed (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  preco_venda DECIMAL(10,2) NOT NULL,
  preco_custo DECIMAL(10,2) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  descricao TEXT,
  estoque INT DEFAULT 0,
  status VARCHAR(1) DEFAULT '1',
  codigo_loja VARCHAR(50) NOT NULL,
  id_loja VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Tabela: ComandaPedidos
```sql
CREATE TABLE ComandaPedidos (
  IdPedido INT AUTO_INCREMENT PRIMARY KEY,
  comanda VARCHAR(50) NOT NULL,
  user_name VARCHAR(100) NOT NULL,
  user_id VARCHAR(50),
  IdItem VARCHAR(50) NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  QtdeItem INT NOT NULL,
  status VARCHAR(2) NOT NULL,
  data_completa TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  codigo_loja VARCHAR(50) NOT NULL,
  id_loja VARCHAR(50)
);
```

### 4. Comandos de Build

O Render executará automaticamente:
```bash
npm install && npm run build  # Build command
npm start                     # Start command
```

### 5. Configurações do Render

- **Environment**: Node.js
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Port**: 10000 (configurado automaticamente)
- **Health Check**: `/` (raiz da aplicação)

### 6. Verificação Pós-Deploy

Após o deploy:
1. Verificar se a aplicação inicia sem erros
2. Testar a página de login
3. Verificar se a conexão MySQL está funcionando
4. Testar o dashboard com dados reais

### 7. Troubleshooting

**Erro "no such file or directory" Dockerfile:**
✅ **RESOLVIDO** - Adicionado Dockerfile e configurações para compatibilidade
- O projeto agora inclui Dockerfile funcional
- Arquivo .node-version especifica versão do Node.js 18
- render.yaml atualizado com configurações corretas

**Erro de Conexão MySQL:**
- Verificar se as variáveis de ambiente estão corretas
- Confirmar se o host do InfinityFree permite conexões externas
- Verificar se o usuário MySQL tem permissões adequadas

**Erro de Build:**
- Verificar se todas as dependências estão no package.json
- Confirmar se os scripts de build estão corretos
- Build testado com sucesso: ✅ Frontend + Backend compilados

**Erro de Timeout:**
- O InfinityFree pode ter limitações de tempo de conexão
- Verificar os logs do Render para detalhes específicos

## Resultado Final

Após o deploy bem-sucedido:
- ✅ Aplicação roda exclusivamente com banco MySQL real
- ✅ Sem dados de teste ou fallback
- ✅ Dashboard com métricas reais do restaurante
- ✅ Sistema de autenticação funcional
- ✅ Todas as análises baseadas em dados reais do InfinityFree