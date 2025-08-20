// Script para testar conexão MySQL e verificar dados
import mysql from 'mysql2/promise';

async function testMySQLConnection() {
  try {
    console.log('🔍 Tentando conectar ao banco MySQL...');
    
    console.log(`🔗 Conectando ao InfinityFree MySQL...`);
    console.log(`   Host: ${process.env.MYSQL_HOST}`);
    console.log(`   Database: ${process.env.MYSQL_DATABASE}`);
    console.log(`   User: ${process.env.MYSQL_USER}`);
    
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: 3306,
      connectTimeout: 30000,
      acquireTimeout: 30000,
      timeout: 30000
    });

    console.log('✅ Conexão MySQL estabelecida com sucesso!');

    // Testar algumas consultas básicas
    console.log('\n📊 Testando consultas básicas...');
    
    // Verificar clientes
    const [clientes] = await connection.execute('SELECT COUNT(*) as total FROM clientes');
    console.log(`   Clientes cadastrados: ${clientes[0].total}`);
    
    // Verificar produtos
    const [produtos] = await connection.execute('SELECT COUNT(*) as total FROM cadastrofeed');
    console.log(`   Produtos cadastrados: ${produtos[0].total}`);
    
    // Verificar pedidos
    const [pedidos] = await connection.execute('SELECT COUNT(*) as total FROM ComandaPedidos');
    console.log(`   Pedidos registrados: ${pedidos[0].total}`);

    // Verificar lojas disponíveis
    const [lojas] = await connection.execute('SELECT DISTINCT codigo_loja FROM clientes LIMIT 5');
    console.log(`   Códigos de loja encontrados: ${lojas.map(l => l.codigo_loja).join(', ')}`);

    await connection.end();
    console.log('\n✅ Teste concluído com sucesso! Banco MySQL está pronto para uso.');
    
  } catch (error) {
    console.error('❌ Erro ao conectar com MySQL:', error.message);
    console.log('\n🔧 Para usar o banco MySQL:');
    console.log('1. Certifique-se que o MySQL está rodando');
    console.log('2. Configure as variáveis de ambiente no .env');
    console.log('3. Defina USE_MYSQL=true no .env');
    console.log('4. Reinicie a aplicação');
    console.log('\n📝 Atualmente usando dados de teste. Para produção, configure o MySQL.');
  }
}

testMySQLConnection();