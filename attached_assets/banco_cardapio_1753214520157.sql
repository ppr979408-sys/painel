-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 08/04/2025 às 01:02
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `menu`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `acesso_cliente`
--

CREATE TABLE `acesso_cliente` (
  `usuario_id` int(5) NOT NULL,
  `nome` varchar(50) NOT NULL DEFAULT '',
  `sobrenome` varchar(50) NOT NULL DEFAULT '',
  `email` varchar(100) NOT NULL DEFAULT '',
  `usuario` varchar(32) NOT NULL DEFAULT '',
  `senha` varchar(32) NOT NULL DEFAULT '',
  `info` text NOT NULL,
  `nivel_usuario` enum('0','1','2') NOT NULL DEFAULT '0',
  `data_cadastro` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `data_ultimo_login` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ativado` enum('0','1') NOT NULL DEFAULT '0',
  `cpf_cnpj` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `rg` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `tel_celular` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `tel_fixo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cep` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `endereco` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `numero` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `bairro` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cidade` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `sexo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `uf` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `adicional`
--

CREATE TABLE `adicional` (
  `id` smallint(8) NOT NULL,
  `titulo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `preco_venda` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `preco_custo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `estoque` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `limite` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `data_cadastro` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `data_atualizacao` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `ads`
--

CREATE TABLE `ads` (
  `id` smallint(8) NOT NULL,
  `imagem` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `link` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `local` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `tipo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cliques` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `views` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `afiliados`
--

CREATE TABLE `afiliados` (
  `id` smallint(8) NOT NULL,
  `nome` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `email` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `porcentagem` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `algum_imagem`
--

CREATE TABLE `algum_imagem` (
  `id` smallint(8) NOT NULL,
  `id_empresa` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `nome` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `data` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `upload_livre` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `arquivos`
--

CREATE TABLE `arquivos` (
  `id` smallint(8) NOT NULL,
  `id_cad` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `file` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `titulo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `descricao` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `descricao_curta` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_empresa` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `url` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `atualizacao`
--

CREATE TABLE `atualizacao` (
  `id` smallint(8) NOT NULL,
  `versao` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `avaliacoes`
--

CREATE TABLE `avaliacoes` (
  `id` smallint(9) NOT NULL,
  `id_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `user_id` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `data` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `mensagem` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `estrelas` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `blog`
--

CREATE TABLE `blog` (
  `id` int(10) NOT NULL,
  `file` varchar(100) NOT NULL,
  `type` varchar(10) NOT NULL,
  `size` int(11) NOT NULL,
  `film` text NOT NULL,
  `categoria` text NOT NULL,
  `url` text NOT NULL,
  `classificacao` text NOT NULL,
  `descricao` text NOT NULL,
  `descricaocurta` text NOT NULL,
  `banner1` text NOT NULL,
  `banner2` text NOT NULL,
  `banner3` text NOT NULL,
  `file_2` varchar(100) NOT NULL,
  `type_2` varchar(50) NOT NULL,
  `size_2` int(11) NOT NULL,
  `link` text NOT NULL,
  `id_empresa` text NOT NULL,
  `codigo` text NOT NULL,
  `dia` text NOT NULL,
  `mes` text NOT NULL,
  `ano` text NOT NULL,
  `busca` text NOT NULL,
  `destaque` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `boas_vindas`
--

CREATE TABLE `boas_vindas` (
  `id` smallint(8) NOT NULL,
  `id_usuario` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `dia` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `mes` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `cadastrofeed`
--

CREATE TABLE `cadastrofeed` (
  `id` int(10) NOT NULL,
  `IdAdministrativo` text NOT NULL,
  `titulo` text NOT NULL,
  `consumo_local` text NOT NULL,
  `ean` text NOT NULL,
  `file` text NOT NULL,
  `caminho` text NOT NULL,
  `preco_venda` text NOT NULL,
  `desconto` text NOT NULL,
  `preco_custo` text NOT NULL,
  `estoque` text NOT NULL,
  `descricao` text NOT NULL,
  `busca` text NOT NULL,
  `destaque` text NOT NULL,
  `url` text NOT NULL,
  `status` text NOT NULL,
  `id_loja` text NOT NULL,
  `codigo_loja` text NOT NULL,
  `categoria` text NOT NULL,
  `adicionais` text NOT NULL,
  `data_cadastro` text NOT NULL,
  `pizza` text NOT NULL,
  `dois_sabores` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `cadastrofeed_varfilho`
--

CREATE TABLE `cadastrofeed_varfilho` (
  `id` smallint(8) NOT NULL,
  `id_variacao` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_variacaofilho` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_produto` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `preco` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `cadastrofeed_varpai`
--

CREATE TABLE `cadastrofeed_varpai` (
  `id` smallint(8) NOT NULL,
  `id_variacao` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_produto` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `categorias`
--

CREATE TABLE `categorias` (
  `id` int(10) NOT NULL,
  `nome` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `classe_css` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `status` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `categorias_administrativas`
--

CREATE TABLE `categorias_administrativas` (
  `id` smallint(8) NOT NULL,
  `titulo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `foto` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `url` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `destaque` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `categorias_administrativas`
--

INSERT INTO `categorias_administrativas` (`id`, `titulo`, `foto`, `url`, `destaque`) VALUES
(1, 'Açai', 'https://app.kifomi.com.br/uploads/categorias/acai.png', 'acai', '1'),
(2, 'Bebidas', 'https://app.kifomi.com.br/uploads/categorias/bebidas.jpeg', 'bebidas', '1'),
(3, 'Lanches', 'https://app.kifomi.com.br/uploads/categorias/lanche.webp', 'lanches', '1'),
(4, 'Hotdog', 'https://app.kifomi.com.br/uploads/categorias/hotdog.avif', 'hotdog', '1'),
(5, 'Pastel', 'https://app.kifomi.com.br/uploads/categorias/pastel.jpeg', 'pastel', '1'),
(6, 'Sorvetes', 'https://app.kifomi.com.br/uploads/categorias/sorvete.jpeg', 'sorvetes', '1'),
(7, 'Doces', 'https://app.kifomi.com.br/uploads/categorias/doces.jpeg', 'doces', '1'),
(8, 'Almoço', 'https://app.kifomi.com.br/uploads/categorias/almoco.jpeg', 'almoco', '1');

-- --------------------------------------------------------

--
-- Estrutura para tabela `categorias_imagem`
--

CREATE TABLE `categorias_imagem` (
  `id` int(10) NOT NULL,
  `nome` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `classe_css` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `status` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `categoria_produtos`
--

CREATE TABLE `categoria_produtos` (
  `id` int(10) NOT NULL,
  `sequencia` text NOT NULL,
  `file` varchar(100) NOT NULL,
  `caminho` text NOT NULL,
  `type` varchar(10) NOT NULL,
  `size` int(11) NOT NULL,
  `titulo` text NOT NULL,
  `url` text NOT NULL,
  `titulo_codigo` text NOT NULL,
  `codigo` text NOT NULL,
  `destaque` text NOT NULL,
  `menu` text NOT NULL,
  `id_loja` text NOT NULL,
  `codigo_loja` text NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `clientes`
--

CREATE TABLE `clientes` (
  `id` int(8) NOT NULL,
  `adm` text NOT NULL,
  `codigo_loja` text NOT NULL,
  `nome` text NOT NULL,
  `sobrenome` text NOT NULL,
  `nome_empresa` text NOT NULL,
  `cnpj_empresa` text NOT NULL,
  `cpf_dono` text NOT NULL,
  `razao_social` text NOT NULL,
  `nome_fantasia` text NOT NULL,
  `categorias` text NOT NULL,
  `email` text NOT NULL,
  `telefone` text NOT NULL,
  `cep` text NOT NULL,
  `endereco` text NOT NULL,
  `numero` text NOT NULL,
  `bairro` text NOT NULL,
  `cidade` text NOT NULL,
  `uf` text NOT NULL,
  `valor_site` text NOT NULL,
  `valor_mensal` text NOT NULL,
  `data_fechamento` text NOT NULL,
  `dia_pagamento` text NOT NULL,
  `data_vencimento` text NOT NULL,
  `status` text NOT NULL,
  `plano` text NOT NULL,
  `token_whatsapp` text NOT NULL,
  `total_pagar` text NOT NULL,
  `meses` text NOT NULL,
  `codigo_transacao` text NOT NULL,
  `linha_pix` text NOT NULL,
  `qrcode_pix` text NOT NULL,
  `validade_pix` text NOT NULL,
  `token` text NOT NULL,
  `data_token` text NOT NULL,
  `email_afiliado` text NOT NULL,
  `porcentagem_afiliado` text NOT NULL,
  `primeiro_envio` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `colaborador`
--

CREATE TABLE `colaborador` (
  `id` int(10) NOT NULL,
  `file` varchar(100) NOT NULL,
  `type` varchar(10) NOT NULL,
  `size` int(11) NOT NULL,
  `film` text NOT NULL,
  `descricao` text NOT NULL,
  `nome` varchar(250) NOT NULL,
  `funcao` varchar(250) NOT NULL,
  `classificacao` text NOT NULL,
  `id_empresa` text NOT NULL,
  `codigo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `ComandaAdicional`
--

CREATE TABLE `ComandaAdicional` (
  `IdAdicional` smallint(11) NOT NULL,
  `IdPedido` int(11) DEFAULT NULL,
  `id` varchar(10) DEFAULT NULL,
  `preco` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `qtde` int(11) DEFAULT NULL,
  `IdItem` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `IdCart` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `comanda` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `ComandaId`
--

CREATE TABLE `ComandaId` (
  `id` smallint(255) NOT NULL,
  `comanda` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `total_concluido` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `user_id` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `tipo_pedido` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `obs` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `ComandaPedidos`
--

CREATE TABLE `ComandaPedidos` (
  `IdPedido` smallint(11) NOT NULL,
  `comanda` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `mesa` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `user_name` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `user_id` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT 'token de login',
  `IdCart` int(11) DEFAULT NULL,
  `IdItem` varchar(10) DEFAULT NULL,
  `preco` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `obs` text DEFAULT NULL,
  `QtdeItem` int(11) DEFAULT NULL,
  `status` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL COMMENT '1=Aberta, 2=Prepando, 3=Saiu para entrega, 4=Finalizada, 5=Cancelado',
  `data_status_1` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `data_status_2` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `data_status_3` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `data_status_4` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `data_status_5` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `status_item` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `data` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cod_data` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `data_completa` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `notificacao_admin` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `notificacao_wpp` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `ComandaTaxas`
--

CREATE TABLE `ComandaTaxas` (
  `id` smallint(8) NOT NULL,
  `user_id` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `IdComanda` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `TaxaEntrega` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `forma_pagamento` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `troco` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `Desconto` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `TipoPedido` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `UserAndressId` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `ComandaVariacoes`
--

CREATE TABLE `ComandaVariacoes` (
  `IdVariacao` smallint(11) NOT NULL,
  `IdPedido` int(11) DEFAULT NULL,
  `preco` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `varPai` varchar(50) DEFAULT NULL,
  `VarFilho` varchar(50) DEFAULT NULL,
  `IdItem` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `comanda` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `config_fly`
--

CREATE TABLE `config_fly` (
  `id` smallint(8) NOT NULL,
  `token` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `email` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `prazo_boleto` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ambiente` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT '1 produtoção - 2 sandbox',
  `juros` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Despejando dados para a tabela `config_fly`
--

INSERT INTO `config_fly` (`id`, `token`, `email`, `prazo_boleto`, `ambiente`, `juros`) VALUES
(1, '', 'mayconbraga@plataformafly.com.br', '2', '1', '2.2');

-- --------------------------------------------------------

--
-- Estrutura para tabela `config_pagamento`
--

CREATE TABLE `config_pagamento` (
  `id` smallint(8) NOT NULL,
  `prazo_cancelamento` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `nome_modulo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `status` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_empresa` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `function_class` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `token` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `email` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `nome_completo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `chave_pix` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cidade` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `descricao` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Despejando dados para a tabela `config_pagamento`
--

INSERT INTO `config_pagamento` (`id`, `prazo_cancelamento`, `nome_modulo`, `status`, `id_empresa`, `function_class`, `token`, `email`, `nome_completo`, `chave_pix`, `cidade`, `descricao`) VALUES
(1, '00:30:00', 'Pix (Bacen)', '', '82', 'pix_estatico', '', '', 'fp17', '', 'SÃO PAULO', ''),
(2, '01:00:00', 'Pix (Yapay)', '', '82', 'pix_yapay', '', '', 'maycon', '', '', ''),
(3, '01:00:00', 'Mercado Pago', '1', '82', 'mercado_pago', '', '', 'maycon', '', '', 'Agendamento Quadra');

-- --------------------------------------------------------

--
-- Estrutura para tabela `etiquetas`
--

CREATE TABLE `etiquetas` (
  `id` smallint(8) NOT NULL,
  `id_empresa` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `altura` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `largura` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `img` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `titulo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `nome` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `preco` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `arquivo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `url` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `status` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(220) DEFAULT NULL,
  `color` varchar(10) DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `nome_cliente` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_cliente` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_servico` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo_agendamento` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `copia_pix` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `qrcode_pix` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo_transacao` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_empresa` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `valor` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `horario_abertura` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `minutos` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `qtde_minutos` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `data_registro` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cod_data_registro` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `data_prazo_pix` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cod_data_prazo_pix` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `notificacao` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `status` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT '1p, 2a'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `FaixaCepAdministrativo`
--

CREATE TABLE `FaixaCepAdministrativo` (
  `id` smallint(8) NOT NULL,
  `titulo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cidade` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `faixa_inicio` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `faixa_fim` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `FaixasCEP`
--

CREATE TABLE `FaixasCEP` (
  `id` int(11) NOT NULL,
  `titulo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cidade` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `faixa_inicio` varchar(10) NOT NULL,
  `faixa_fim` varchar(10) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `codigo_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `IdAdministrativo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `fly_users`
--

CREATE TABLE `fly_users` (
  `fly_user_id` smallint(8) NOT NULL,
  `fly_user_nome` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `fly_user_email` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `fly_user_senha` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `fly_user_url` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Despejando dados para a tabela `fly_users`
--

INSERT INTO `fly_users` (`fly_user_id`, `fly_user_nome`, `fly_user_email`, `fly_user_senha`, `fly_user_url`) VALUES
(1, 'Maycon Braga', 'mayconbraga@plataformafly.com.br', 'e73bb861618529b6ace95abdb92a2975', 'maycon-braga-19');

-- --------------------------------------------------------

--
-- Estrutura para tabela `galeria`
--

CREATE TABLE `galeria` (
  `id` int(10) NOT NULL,
  `file` varchar(100) NOT NULL,
  `type` varchar(10) NOT NULL,
  `size` int(11) NOT NULL,
  `film` text NOT NULL,
  `categoria` text NOT NULL,
  `classificacao` text NOT NULL,
  `descricao` text NOT NULL,
  `descricaocurta` text NOT NULL,
  `banner1` text NOT NULL,
  `banner2` text NOT NULL,
  `banner3` text NOT NULL,
  `filed` varchar(250) NOT NULL,
  `typed` varchar(250) NOT NULL,
  `sized` int(250) NOT NULL,
  `filmd` text NOT NULL,
  `titulo` text NOT NULL,
  `cor_font` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `galeria_imagens`
--

CREATE TABLE `galeria_imagens` (
  `id` int(10) NOT NULL,
  `file` varchar(100) NOT NULL,
  `titulo` text NOT NULL,
  `status` text NOT NULL,
  `codigo_loja` text NOT NULL,
  `id_loja` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `horario_especial`
--

CREATE TABLE `horario_especial` (
  `id` smallint(8) NOT NULL,
  `id_empresa` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_servico` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `horario_abertura` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `horario_abertura_2` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `minutos` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `minutos_2` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `qtde_minutos` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `qtde_minutos_2` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `preco` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `data` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `imagem_produto`
--

CREATE TABLE `imagem_produto` (
  `id` int(10) NOT NULL,
  `file` varchar(100) NOT NULL,
  `type` varchar(10) NOT NULL,
  `size` int(11) NOT NULL,
  `titulo` text NOT NULL,
  `status` text NOT NULL,
  `id_empresa` text NOT NULL,
  `codigo` text NOT NULL,
  `id_produto` text NOT NULL,
  `codigo_produto` text NOT NULL,
  `active` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `info_empresa`
--

CREATE TABLE `info_empresa` (
  `id` int(10) NOT NULL,
  `file` varchar(100) NOT NULL,
  `type` varchar(10) NOT NULL,
  `size` int(11) NOT NULL,
  `film` text NOT NULL,
  `categoria` text NOT NULL,
  `classificacao` text NOT NULL,
  `descricao` text NOT NULL,
  `descricaocurta` text NOT NULL,
  `banner1` text NOT NULL,
  `banner2` text NOT NULL,
  `banner3` text NOT NULL,
  `file_2` varchar(100) NOT NULL,
  `type_2` varchar(50) NOT NULL,
  `size_2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `layout`
--

CREATE TABLE `layout` (
  `id` smallint(8) NOT NULL,
  `file` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `type` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `size` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `background_menu_1` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cor_menu_1` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `background_menu` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cor_menu` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `background_sobre` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cor_sobre` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cor_nome_empresa` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cor_sobre_empresa` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `background_servicos` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cor_titulo_servicos` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `botao_servicos` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cor_servicos` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_empresa` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `nome_empresa` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `nome` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `background_novidades` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cor_novidades` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `botao_novidades` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `background_produtos` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `background_conteudo_produtos` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cor_produtos` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cor_titulo_produtos` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `botao_produtos` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cor_botao_produtos` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `background_depoimentos` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cor_depoimentos` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cor_cidade_depoimento` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cor_nome_depoimento` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `conteudo_depoimentos` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `background_parceiros` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `background_blog` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cor_blog` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cor_conteudo_blog` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cor_titulo_blog` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cor_data_blog` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `botao_blog` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `background_contato` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cor_contato` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cor_dados_contato` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `caixa_texto_contato` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `botao_contato` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `background_rodape` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `dados_contato` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Despejando dados para a tabela `layout`
--

INSERT INTO `layout` (`id`, `file`, `type`, `size`, `background_menu_1`, `cor_menu_1`, `background_menu`, `cor_menu`, `background_sobre`, `cor_sobre`, `cor_nome_empresa`, `cor_sobre_empresa`, `background_servicos`, `cor_titulo_servicos`, `botao_servicos`, `cor_servicos`, `id_empresa`, `nome_empresa`, `codigo`, `nome`, `background_novidades`, `cor_novidades`, `botao_novidades`, `background_produtos`, `background_conteudo_produtos`, `cor_produtos`, `cor_titulo_produtos`, `botao_produtos`, `cor_botao_produtos`, `background_depoimentos`, `cor_depoimentos`, `cor_cidade_depoimento`, `cor_nome_depoimento`, `conteudo_depoimentos`, `background_parceiros`, `background_blog`, `cor_blog`, `cor_conteudo_blog`, `cor_titulo_blog`, `cor_data_blog`, `botao_blog`, `background_contato`, `cor_contato`, `cor_dados_contato`, `caixa_texto_contato`, `botao_contato`, `background_rodape`, `dados_contato`) VALUES
(20, '', '', '', '#5cb85c', '#ffffff', '#ffffff', '#000000', '', '', '', '', '', '', '', '', '81', '', '444b44f645784943c9be3aff08eb7b00', 'Cores', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `layout_email`
--

CREATE TABLE `layout_email` (
  `id` smallint(8) NOT NULL,
  `codigo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cabecario` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `corpo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `final_corpo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `rodape` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Despejando dados para a tabela `layout_email`
--

INSERT INTO `layout_email` (`id`, `codigo`, `cabecario`, `corpo`, `final_corpo`, `rodape`) VALUES
(1, '', '<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:600px; background-color: white;\">    <tbody>       <tr>          <td style=\"padding-top: 80px\">             <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:490px; background-color:#EAEEED\">                <tbody>                   <tr>                      <td style=\"padding-top: 30px;\" align=\"center\">                         <img src=\"https://plataformafly.com.br/painel/index/clientes/imagem/LOGO.png\" style=\"width: 50%;\" alt=\"\" border=\"0\" style=\"display: block;\">                      </td>                   </tr>                   <tr>                      <td style=\"font-family: arial ; font-weight: bold; font-size: 24px; color: #334A6C; text-align: center; padding-top: 40px; letter-spacing: 2px;\">                         Sua nova Fatura<br>                       </td>                   </tr>                   <tr>                      <td style=\"padding-top: 20px\">                          <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:380px;\">                            <tr>                               <td style=\"font-family: verdana; font-size: 13px; color: #334A6C;text-align: center;letter-spacing: 1px;\">                                  <b>Olá', ', tudo bem ?</b>                                  <br><br>                                  Estamos passando para informar que sua nova fatura já está disponível <br><br> Valor: <b>R$ ', '</b> já está disponível                               </td>                            </tr>                      </table>                      </td>                   </tr>                   <tr>                      <td style=\"padding-top: 20px;\">                          <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:170px;\">                            <tr>                               <td>                               ', '                               </td>                            </tr>                           </table>                      </td>                   </tr>                   <tr>                      <td style=\"padding-top: 20px;\">                          <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:170px;\">                                                       </table>                      </td>                   </tr>                                   </tbody>             </table>          </td>       </tr> <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\">        <tr>          <td style=\"padding-top: 40px; width: 472px;\">             <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:472px; background-color: #ccc; padding: 30px;\">                <tbody>                   <tr>                      <td style=\"width: 342px; font-family: verdana; font-size: 11px; color: black; padding-left: 10px\">                         <a href=\"mailto:contato@plataformafly.com.br\" style=\"text-decoration: none;color: black\">contato@plataformafly.com.br</a><br>                         <a href=\"tel:(14) 3415-1848\" style=\"text-decoration: none;color: black\">(14) 3415-1848</a>                      </td>                      <td style=\"width: 342px; font-family: verdana; font-size: 11px; color: black; padding-left: 10px\">                        <a href=\"https://www.facebook.com/plataformafly/\" style=\"text-decoration: none;color: black\"><i class=\"fa fa-facebook\" style=\"font-size:22px\"></i></a>                         <a href=\"https://www.instagram.com/plataformafly/\" style=\"text-decoration: none;color: black\"><i class=\"fa fa-instagram\" style=\"font-size:22px\"></i></a>                         <br>                      </td>                   </tr>                </tbody>             </table>          </td>       </tr>       <tr>          <td style=\"padding-top: 30px;width: 472px\">              <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:472px;\">                <tr>                   <td style=\"width: 472px\">                      <hr style=\"background-color: #ffffff;\" color=\"#ffffff\">                   </td>                </tr>              </table>          </td>       </tr>        <tr>          <td style=\"width: 411px; font-family: verdana; font-size: 11px; color: #ffffff; text-align: center; padding-top:15px; padding-bottom: 80px\">             <a href=\"https://www.plataformafly.com.br\" style=\"text-decoration: none;color: black\">www.plataformafly.com.br</a>           </td>       </tr>    </tbody> </table>');

-- --------------------------------------------------------

--
-- Estrutura para tabela `local_banner`
--

CREATE TABLE `local_banner` (
  `id` smallint(8) NOT NULL,
  `local` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_empresa` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Despejando dados para a tabela `local_banner`
--

INSERT INTO `local_banner` (`id`, `local`, `id_empresa`) VALUES
(1, 'Rotativo', ''),
(2, 'Novidades', ''),
(3, 'Banner-corpo', ''),
(4, 'Blog', ''),
(5, 'Busca', ''),
(6, 'Produtos', ''),
(7, 'Contatos', ''),
(8, 'Sobre', ''),
(9, 'Arquivos', '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `logo`
--

CREATE TABLE `logo` (
  `id` int(10) NOT NULL,
  `file` varchar(100) NOT NULL,
  `type` varchar(10) NOT NULL,
  `size` int(11) NOT NULL,
  `film` text NOT NULL,
  `codigo` text NOT NULL,
  `id_loja` text NOT NULL,
  `codigo_loja` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `mesas`
--

CREATE TABLE `mesas` (
  `id` smallint(8) NOT NULL,
  `titulo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `mesas`
--

INSERT INTO `mesas` (`id`, `titulo`, `id_loja`, `codigo_loja`) VALUES
(2, 'mesa 1', '9', 'Restaurante-Fumie');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pagamentos`
--

CREATE TABLE `pagamentos` (
  `id` smallint(8) NOT NULL,
  `id_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `valor` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `data_pagamento` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `meses` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Despejando dados para a tabela `pagamentos`
--

INSERT INTO `pagamentos` (`id`, `id_loja`, `codigo_loja`, `valor`, `data_pagamento`, `meses`) VALUES
(1, '9', 'Restaurante-Fumie', '94.98', '15/02/2024 22:10:48', '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `painel`
--

CREATE TABLE `painel` (
  `id` smallint(8) NOT NULL,
  `painel` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Despejando dados para a tabela `painel`
--

INSERT INTO `painel` (`id`, `painel`) VALUES
(1, 'painel');

-- --------------------------------------------------------

--
-- Estrutura para tabela `planos`
--

CREATE TABLE `planos` (
  `id` smallint(8) NOT NULL,
  `valor` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo_plano` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `plano` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Despejando dados para a tabela `planos`
--

INSERT INTO `planos` (`id`, `valor`, `codigo_plano`, `plano`) VALUES
(1, '119.99', 'delivery', 'Cardápio, Web Delivery e Bot WhasApp'),
(2, '29.99', 'Cardapio', 'Cardápio virtual'),
(3, '49.99', 'Cardapio-delivery', 'Cardápio e Web Delivery');

-- --------------------------------------------------------

--
-- Estrutura para tabela `prazo_bloqueio`
--

CREATE TABLE `prazo_bloqueio` (
  `id` smallint(8) NOT NULL,
  `prazo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Despejando dados para a tabela `prazo_bloqueio`
--

INSERT INTO `prazo_bloqueio` (`id`, `prazo`) VALUES
(1, '7');

-- --------------------------------------------------------

--
-- Estrutura para tabela `ProdutosAdmin`
--

CREATE TABLE `ProdutosAdmin` (
  `id` smallint(8) NOT NULL,
  `titulo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `url` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `arquivo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `prospectos`
--

CREATE TABLE `prospectos` (
  `id` smallint(8) NOT NULL,
  `empresa` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `responsavel` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `contatos` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `email` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `site` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `erp` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `facebook` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `instagram` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `tiktok` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `status` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cidade` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `data` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `usuario_nome` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `usuario_id` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `obs` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `servicos`
--

CREATE TABLE `servicos` (
  `id` int(10) NOT NULL,
  `file` varchar(100) NOT NULL,
  `categoria` text NOT NULL,
  `horario_abertura_seg_2` text NOT NULL,
  `minutos_seg_2` text NOT NULL,
  `qtde_minutos_seg_2` text NOT NULL,
  `preco_seg_2` text NOT NULL,
  `horario_abertura_ter_2` text NOT NULL,
  `minutos_ter_2` text NOT NULL,
  `qtde_minutos_ter_2` text NOT NULL,
  `preco_ter_2` text NOT NULL,
  `horario_abertura_qua_2` text NOT NULL,
  `minutos_qua_2` text NOT NULL,
  `qtde_minutos_qua_2` text NOT NULL,
  `preco_qua_2` text NOT NULL,
  `horario_abertura_qui_2` text NOT NULL,
  `minutos_qui_2` text NOT NULL,
  `qtde_minutos_qui_2` text NOT NULL,
  `preco_qui_2` text NOT NULL,
  `horario_abertura_sex_2` text NOT NULL,
  `minutos_sex_2` text NOT NULL,
  `qtde_minutos_sex_2` text NOT NULL,
  `preco_sex_2` text NOT NULL,
  `horario_abertura_sab_2` text NOT NULL,
  `minutos_sab_2` text NOT NULL,
  `qtde_minutos_sab_2` text NOT NULL,
  `preco_sab_2` text NOT NULL,
  `horario_abertura_dom_2` text NOT NULL,
  `minutos_dom_2` text NOT NULL,
  `qtde_minutos_dom_2` text NOT NULL,
  `preco_dom_2` text NOT NULL,
  `horario_abertura_seg` text NOT NULL,
  `minutos_seg` text NOT NULL,
  `qtde_minutos_seg` text NOT NULL,
  `preco_seg` text NOT NULL,
  `horario_abertura_ter` text NOT NULL,
  `minutos_ter` text NOT NULL,
  `qtde_minutos_ter` text NOT NULL,
  `preco_ter` text NOT NULL,
  `horario_abertura_qua` text NOT NULL,
  `minutos_qua` text NOT NULL,
  `qtde_minutos_qua` text NOT NULL,
  `preco_qua` text NOT NULL,
  `horario_abertura_qui` text NOT NULL,
  `minutos_qui` text NOT NULL,
  `qtde_minutos_qui` text NOT NULL,
  `preco_qui` text NOT NULL,
  `horario_abertura_sex` text NOT NULL,
  `minutos_sex` text NOT NULL,
  `qtde_minutos_sex` text NOT NULL,
  `preco_sex` text NOT NULL,
  `horario_abertura_sab` text NOT NULL,
  `minutos_sab` text NOT NULL,
  `qtde_minutos_sab` text NOT NULL,
  `preco_sab` text NOT NULL,
  `horario_abertura_dom` text NOT NULL,
  `minutos_dom` text NOT NULL,
  `qtde_minutos_dom` text NOT NULL,
  `preco_dom` text NOT NULL,
  `descricao` text NOT NULL,
  `descricaocurta` text NOT NULL,
  `link_youtube` text NOT NULL,
  `id_empresa` text NOT NULL,
  `nome_empresa` text NOT NULL,
  `codigo` text NOT NULL,
  `busca` text NOT NULL,
  `n_botao` text NOT NULL,
  `link_botao` text NOT NULL,
  `url` text NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `sobrenos`
--

CREATE TABLE `sobrenos` (
  `ID` int(10) UNSIGNED ZEROFILL NOT NULL,
  `codigo_loja` text NOT NULL,
  `id_loja` text NOT NULL,
  `abertura` text NOT NULL,
  `tempo_entrega` varchar(6000) NOT NULL,
  `banner` text NOT NULL,
  `ApiWhatsAppNumber` text NOT NULL,
  `ApiWhatsAppToken1` text NOT NULL,
  `ApiWhatsAppToken2` text NOT NULL,
  `ApiWhatsAppStatus` text NOT NULL,
  `IframeInsta` text NOT NULL,
  `email` varchar(300) DEFAULT NULL,
  `botao` varchar(300) DEFAULT NULL,
  `corpo` text NOT NULL,
  `telefone` text NOT NULL,
  `cidade` text NOT NULL,
  `bairro` text NOT NULL,
  `rua` text NOT NULL,
  `cep` text NOT NULL,
  `inicio` text NOT NULL,
  `fim` text NOT NULL,
  `video` text NOT NULL,
  `sobre` text NOT NULL,
  `iniciodia` text NOT NULL,
  `fimdia` text NOT NULL,
  `nome_empresa` text NOT NULL,
  `descricao_curta` text NOT NULL,
  `visao` text NOT NULL,
  `valores` text NOT NULL,
  `email_orcamento` text NOT NULL,
  `mapa` text NOT NULL,
  `file` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `size` int(11) NOT NULL,
  `chat` longtext NOT NULL,
  `analytics` text NOT NULL,
  `adsense` text NOT NULL,
  `titulo_util` text NOT NULL,
  `facebook` text NOT NULL,
  `link_gps` text NOT NULL,
  `link_facebook` text NOT NULL,
  `link_instagram` text NOT NULL,
  `whatsapp` text NOT NULL,
  `whatsappPedido` text NOT NULL,
  `telefone_2` text NOT NULL,
  `js_facebook` text NOT NULL,
  `id_empresa` text NOT NULL,
  `codigo` text NOT NULL,
  `link_twitter` text NOT NULL,
  `link_google_plus` text NOT NULL,
  `link_linkedin` text NOT NULL,
  `link_pinterest` text NOT NULL,
  `link_youtube` text NOT NULL,
  `keywords` text NOT NULL,
  `som_notificacao` text NOT NULL,
  `abertura_dom` text NOT NULL,
  `abertura_seg` text NOT NULL,
  `abertura_ter` text NOT NULL,
  `abertura_qua` text NOT NULL,
  `abertura_qui` text NOT NULL,
  `abertura_sex` text NOT NULL,
  `abertura_sab` text NOT NULL,
  `fechamento_dom` text NOT NULL,
  `fechamento_seg` text NOT NULL,
  `fechamento_ter` text NOT NULL,
  `fechamento_qua` text NOT NULL,
  `fechamento_qui` text NOT NULL,
  `fechamento_sex` text NOT NULL,
  `fechamento_sab` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `sobrenos`
--

INSERT INTO `sobrenos` (`ID`, `codigo_loja`, `id_loja`, `abertura`, `tempo_entrega`, `banner`, `ApiWhatsAppNumber`, `ApiWhatsAppToken1`, `ApiWhatsAppToken2`, `ApiWhatsAppStatus`, `IframeInsta`, `email`, `botao`, `corpo`, `telefone`, `cidade`, `bairro`, `rua`, `cep`, `inicio`, `fim`, `video`, `sobre`, `iniciodia`, `fimdia`, `nome_empresa`, `descricao_curta`, `visao`, `valores`, `email_orcamento`, `mapa`, `file`, `type`, `size`, `chat`, `analytics`, `adsense`, `titulo_util`, `facebook`, `link_gps`, `link_facebook`, `link_instagram`, `whatsapp`, `whatsappPedido`, `telefone_2`, `js_facebook`, `id_empresa`, `codigo`, `link_twitter`, `link_google_plus`, `link_linkedin`, `link_pinterest`, `link_youtube`, `keywords`, `som_notificacao`, `abertura_dom`, `abertura_seg`, `abertura_ter`, `abertura_qua`, `abertura_qui`, `abertura_sex`, `abertura_sab`, `fechamento_dom`, `fechamento_seg`, `fechamento_ter`, `fechamento_qua`, `fechamento_qui`, `fechamento_sex`, `fechamento_sab`) VALUES
(0000000010, 'Restaurante-Fumie', '9', '', '40', 'aa3977f304e3fec8d3c9c396a1162639', '14997785150', '', '', '', '', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '', '', 'Restaurante Fumiê', '', '', '', '', '', '', '', 0, '', '', '', 'Oficial', '', '', '', '', '14997785150', '', '', '', '', '', '', '', '', '', '', '', '', '', '10:00', '09:00', '11:00', '10:00', '10:00', '10:00', '', '14:00', '14:00', '14:00', '14:00', '14:00', '14:00'),
(0000000011, 'Plataforma-FLY-102865', '10', '', '15', '', '', '', '', '', '', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '', '', 'Plataforma FLY', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '09:00', '', '12:00', '', '', '', '', '20:00', '', '14:00', ''),
(0000000012, 'Max-Hamburguer', '11', '', '40', 'fa5ce4267271fcd3bcf34070d4c0128a', '', '', '', '', '', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '', '', 'Max Hamburguer', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '10:00', '', '09:00', '00:00', '', '', '', '14:00', '', '23:59', '15:00'),
(0000000013, 'Espetinho-do-Chico', '12', '', '40', 'c05b826d9915d270a8351b004dc90641', '', '', '', '', '', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '', '', 'Espetinho do Chico', '', '', '', '', '', '', '', 0, '', '', '', 'Espetos - lanches e jantinhas', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '18:00', '18:00', '18:00', '18:00', '18:00', '18:00', '', '23:59', '23:59', '23:59', '23:59', '23:59', '23:59'),
(0000000014, 'MENUNEGOCIO-109729', '14', '', '', '2f34b4a90c9f1bf447168d863dd12b53', '', '', '', '', '', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(0000000015, 'Divina-Marmitaria-102998', '15', '', '', '', '', '', '', '', '', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(0000000016, 'Dom-Portuga', '16', '', '', 'f3b2abac8fe979ec1ed59b286562f340', '', '', '', '', '', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '', '', 'Dom Portuga', '', '', '', '', '', '', '', 0, '', '', '', 'Restaurante e hamburgueria', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(0000000017, 'lanche-na-praca', '17', '1', '40', 'af2669fe1c16d189fa2fe7405d69cc1c', '14988007439', '', '', '', '', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '', '', 'Lanche na praça', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '09:00', '00:00', '', '', '', '', '', '23:59', '19:00', '', '', ''),
(0000000018, 'das-103634', '18', '', '', '', '', '', '', '', '', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `solicitar`
--

CREATE TABLE `solicitar` (
  `id` int(10) NOT NULL,
  `nome` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `email` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `telefone` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `servico` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_empresa` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `nome_empresa` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `data` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `solicitar_produto`
--

CREATE TABLE `solicitar_produto` (
  `id` int(10) NOT NULL,
  `nome` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `email` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `telefone` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `servico` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_empresa` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `nome_empresa` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `data` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_uploads`
--

CREATE TABLE `tbl_uploads` (
  `id` int(10) NOT NULL,
  `file` varchar(100) NOT NULL,
  `type` varchar(10) NOT NULL,
  `size` int(11) NOT NULL,
  `film` text NOT NULL,
  `categoria` text NOT NULL,
  `local` text NOT NULL,
  `hora_entrada_config` text NOT NULL,
  `hora_saida_config` text NOT NULL,
  `dia_entrada` text NOT NULL,
  `mes_entrada` text NOT NULL,
  `dia_saida` text NOT NULL,
  `mes_saida` text NOT NULL,
  `hora_entrada` text NOT NULL,
  `hora_saida` text NOT NULL,
  `classificacao` text NOT NULL,
  `descricao` text NOT NULL,
  `descricaocurta` text NOT NULL,
  `banner1` text NOT NULL,
  `banner2` text NOT NULL,
  `banner3` text NOT NULL,
  `filed` varchar(250) NOT NULL,
  `typed` varchar(250) NOT NULL,
  `sized` int(250) NOT NULL,
  `filmd` text NOT NULL,
  `titulo` text NOT NULL,
  `cor_font` text NOT NULL,
  `link_botao` text NOT NULL,
  `nome_botao` text NOT NULL,
  `principal` text NOT NULL,
  `id_empresa` text NOT NULL,
  `nome_empresa` text NOT NULL,
  `codigo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `templete`
--

CREATE TABLE `templete` (
  `id` smallint(8) NOT NULL,
  `id_empresa` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `templete` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Despejando dados para a tabela `templete`
--

INSERT INTO `templete` (`id`, `id_empresa`, `templete`, `codigo`) VALUES
(1, '17', 'agenda', '123');

-- --------------------------------------------------------

--
-- Estrutura para tabela `templete_add`
--

CREATE TABLE `templete_add` (
  `id` smallint(8) NOT NULL,
  `id_empresa` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `templete` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Despejando dados para a tabela `templete_add`
--

INSERT INTO `templete_add` (`id`, `id_empresa`, `templete`, `codigo`) VALUES
(188, '2063', 'agenda', '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `test`
--

CREATE TABLE `test` (
  `id` smallint(8) NOT NULL,
  `titulo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cidade` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `faixa_inicio` varchar(10) NOT NULL,
  `faixa_fim` varchar(10) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `codigo_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `IdAdministrativo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `test`
--

INSERT INTO `test` (`id`, `titulo`, `cidade`, `faixa_inicio`, `faixa_fim`, `preco`, `codigo_loja`, `id_loja`, `IdAdministrativo`) VALUES
(132, 'Coca cola lata 350ml', '', '', '', 0.00, '', '', '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `test2`
--

CREATE TABLE `test2` (
  `id` int(10) NOT NULL,
  `IdAdministrativo` text NOT NULL,
  `titulo` text NOT NULL,
  `consumo_local` text NOT NULL,
  `ean` text NOT NULL,
  `file` text NOT NULL,
  `caminho` text NOT NULL,
  `preco_venda` text NOT NULL,
  `desconto` text NOT NULL,
  `preco_custo` text NOT NULL,
  `estoque` text NOT NULL,
  `descricao` text NOT NULL,
  `busca` text NOT NULL,
  `destaque` text NOT NULL,
  `url` text NOT NULL,
  `status` text NOT NULL,
  `id_loja` text NOT NULL,
  `codigo_loja` text NOT NULL,
  `categoria` text NOT NULL,
  `adicionais` text NOT NULL,
  `data_cadastro` text NOT NULL,
  `pizza` text NOT NULL,
  `dois_sabores` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `token`
--

CREATE TABLE `token` (
  `id` smallint(8) NOT NULL,
  `token` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `refresh_token` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Despejando dados para a tabela `token`
--

INSERT INTO `token` (`id`, `token`, `refresh_token`) VALUES
(1, '123', '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `token_notification`
--

CREATE TABLE `token_notification` (
  `id` smallint(8) NOT NULL,
  `codigo_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `user_id` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `token` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `token_notification`
--

INSERT INTO `token_notification` (`id`, `codigo_loja`, `id_loja`, `user_id`, `token`) VALUES
(3, 'Espetinho-do-Chico', '12', '17', 'dDrLTevmboyyNb8h3owrf_:APA91bHHLU0U7VbFk7UZZo70c_F7-sQnCc6teZtIK9fcSnXA_49l9uyJurDe1mShEjdkiG1T1MRHZuDM6z4O2640zvBvuCCOnvFi6I9yWV40fRcLJDaSIaijyE-s9or0hct_f99zwiBI'),
(4, 'Restaurante-Fumie', '9', '10', 'dDrLTevmboyyNb8h3owrf_:APA91bHHLU0U7VbFk7UZZo70c_F7-sQnCc6teZtIK9fcSnXA_49l9uyJurDe1mShEjdkiG1T1MRHZuDM6z4O2640zvBvuCCOnvFi6I9yWV40fRcLJDaSIaijyE-s9or0hct_f99zwiBI'),
(5, 'Restaurante-Fumie', '9', '13', 'cWsHHScpLjgtjhBSgYwFb_:APA91bF-rILmd1KWx-y6qqnTpKUwIeMeIVplSs3R-WCof9EpjcG0FmytQ8wreIGcJpj2P2SS0c-HYGL1j20v_6Cx096R2CD88Pxc75mmeDkEaCYVAf9PZ1FjgBN3MewjjSrQitkCCbxv'),
(6, 'MENUNEGOCIO-109729', '14', '21', 'c_-DQkE5OKgtZGwYz1lehF:APA91bEbbTTTevIxnC58VWT4-b5yGHLKvhQcDIoftpG2z0XusENWFXrVGpHZiji6Mu-S3qGRbHALiljLOgGE31xQ8HLn8lmmcEnCUyks3jommEbT-1P31oUNfMAbhl3UCUn3-8AfEF0b'),
(7, 'Dom-Portuga-102417', '16', '23', 'dDrLTevmboyyNb8h3owrf_:APA91bHHLU0U7VbFk7UZZo70c_F7-sQnCc6teZtIK9fcSnXA_49l9uyJurDe1mShEjdkiG1T1MRHZuDM6z4O2640zvBvuCCOnvFi6I9yWV40fRcLJDaSIaijyE-s9or0hct_f99zwiBI'),
(8, 'Dom-Portuga', '16', '23', 'dDrLTevmboyyNb8h3owrf_:APA91bHHLU0U7VbFk7UZZo70c_F7-sQnCc6teZtIK9fcSnXA_49l9uyJurDe1mShEjdkiG1T1MRHZuDM6z4O2640zvBvuCCOnvFi6I9yWV40fRcLJDaSIaijyE-s9or0hct_f99zwiBI'),
(9, 'Espetinho-do-Chico', '12', '18', 'dDrLTevmboyyNb8h3owrf_:APA91bHHLU0U7VbFk7UZZo70c_F7-sQnCc6teZtIK9fcSnXA_49l9uyJurDe1mShEjdkiG1T1MRHZuDM6z4O2640zvBvuCCOnvFi6I9yWV40fRcLJDaSIaijyE-s9or0hct_f99zwiBI'),
(10, 'Lanche-na-praça-109984', '17', '24', 'dDrLTevmboyyNb8h3owrf_:APA91bHHLU0U7VbFk7UZZo70c_F7-sQnCc6teZtIK9fcSnXA_49l9uyJurDe1mShEjdkiG1T1MRHZuDM6z4O2640zvBvuCCOnvFi6I9yWV40fRcLJDaSIaijyE-s9or0hct_f99zwiBI'),
(11, 'lanche-na-praca', '17', '24', 'dDrLTevmboyyNb8h3owrf_:APA91bHHLU0U7VbFk7UZZo70c_F7-sQnCc6teZtIK9fcSnXA_49l9uyJurDe1mShEjdkiG1T1MRHZuDM6z4O2640zvBvuCCOnvFi6I9yWV40fRcLJDaSIaijyE-s9or0hct_f99zwiBI');

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` smallint(8) NOT NULL,
  `nome` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `telefone` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cep` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `rua` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `numero` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `bairro` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cidade` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `uf` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `data_cad` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `data_login` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `UsersCardapio`
--

CREATE TABLE `UsersCardapio` (
  `id` smallint(8) NOT NULL,
  `nome` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `telefone` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `email` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `senha` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `token` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `reflash_password` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `permissao` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `data_cadastro` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ip` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `UsersEndereco`
--

CREATE TABLE `UsersEndereco` (
  `id` smallint(11) NOT NULL,
  `principal` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `nome` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cep` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `rua` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `numero` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `bairro` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `complemento` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cidade` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `uf` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `UserId` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `usuario_id` int(5) NOT NULL,
  `descricao` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `nome` varchar(50) NOT NULL DEFAULT '',
  `sobrenome` varchar(50) NOT NULL DEFAULT '',
  `email` varchar(100) NOT NULL DEFAULT '',
  `usuario` varchar(32) NOT NULL DEFAULT '',
  `senha` varchar(32) NOT NULL DEFAULT '',
  `info` text NOT NULL,
  `nivel_usuario` enum('0','1','2','3') NOT NULL DEFAULT '0',
  `data_cadastro` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `data_ultimo_login` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ativado` enum('0','1') NOT NULL DEFAULT '0',
  `cpf_cnpj` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `telefone` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `endereco` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `bairro` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cidade` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_empresa` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `nome_empresa` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios_admin`
--

CREATE TABLE `usuarios_admin` (
  `usuario_id` int(5) NOT NULL,
  `nome` varchar(50) NOT NULL DEFAULT '',
  `sobrenome` varchar(50) NOT NULL DEFAULT '',
  `email` varchar(100) NOT NULL DEFAULT '',
  `usuario` varchar(32) NOT NULL DEFAULT '',
  `senha` varchar(32) NOT NULL DEFAULT '',
  `info` text NOT NULL,
  `nivel_usuario` enum('0','1','2','3') NOT NULL DEFAULT '0',
  `data_cadastro` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `data_ultimo_login` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ativado` enum('0','1') NOT NULL DEFAULT '0',
  `cpf_cnpj` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `telefone` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `endereco` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `bairro` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cidade` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `nome_empresa` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_empresa` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario_agenda`
--

CREATE TABLE `usuario_agenda` (
  `id` smallint(8) NOT NULL,
  `principal` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `nome` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `login` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `senha` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `reset_password` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `telefone` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `email` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cpf` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cep` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `rua` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `numero` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `bairro` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cidade` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `uf` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `data_cad` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cookie_appid` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cookie_sessionid` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ultimo_acesso` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `variacao_item`
--

CREATE TABLE `variacao_item` (
  `id` smallint(8) NOT NULL,
  `id_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `titulo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `variacao_id` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `preco` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `variacao_nome`
--

CREATE TABLE `variacao_nome` (
  `id` smallint(8) NOT NULL,
  `id_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo_loja` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `titulo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `file` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `caminho` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `video`
--

CREATE TABLE `video` (
  `id` int(10) NOT NULL,
  `file` varchar(100) NOT NULL,
  `type` varchar(10) NOT NULL,
  `size` int(11) NOT NULL,
  `film` text NOT NULL,
  `categoria` text NOT NULL,
  `classificacao` text NOT NULL,
  `descricao` text NOT NULL,
  `descricaocurta` text NOT NULL,
  `banner1` text NOT NULL,
  `banner2` text NOT NULL,
  `video` text NOT NULL,
  `cor_font` text NOT NULL,
  `categoria_video` text NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `acesso_cliente`
--
ALTER TABLE `acesso_cliente`
  ADD PRIMARY KEY (`usuario_id`);

--
-- Índices de tabela `adicional`
--
ALTER TABLE `adicional`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `ads`
--
ALTER TABLE `ads`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `afiliados`
--
ALTER TABLE `afiliados`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `algum_imagem`
--
ALTER TABLE `algum_imagem`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `arquivos`
--
ALTER TABLE `arquivos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `atualizacao`
--
ALTER TABLE `atualizacao`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `avaliacoes`
--
ALTER TABLE `avaliacoes`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `boas_vindas`
--
ALTER TABLE `boas_vindas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `cadastrofeed`
--
ALTER TABLE `cadastrofeed`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `cadastrofeed` ADD FULLTEXT KEY `titulo` (`titulo`);

--
-- Índices de tabela `cadastrofeed_varfilho`
--
ALTER TABLE `cadastrofeed_varfilho`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `cadastrofeed_varpai`
--
ALTER TABLE `cadastrofeed_varpai`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `categorias_administrativas`
--
ALTER TABLE `categorias_administrativas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `categorias_imagem`
--
ALTER TABLE `categorias_imagem`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `categoria_produtos`
--
ALTER TABLE `categoria_produtos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `colaborador`
--
ALTER TABLE `colaborador`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `ComandaAdicional`
--
ALTER TABLE `ComandaAdicional`
  ADD PRIMARY KEY (`IdAdicional`),
  ADD KEY `IdPedido` (`IdPedido`);

--
-- Índices de tabela `ComandaId`
--
ALTER TABLE `ComandaId`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `ComandaPedidos`
--
ALTER TABLE `ComandaPedidos`
  ADD PRIMARY KEY (`IdPedido`);

--
-- Índices de tabela `ComandaTaxas`
--
ALTER TABLE `ComandaTaxas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `ComandaVariacoes`
--
ALTER TABLE `ComandaVariacoes`
  ADD PRIMARY KEY (`IdVariacao`),
  ADD KEY `IdPedido` (`IdPedido`);

--
-- Índices de tabela `config_fly`
--
ALTER TABLE `config_fly`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `config_pagamento`
--
ALTER TABLE `config_pagamento`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `etiquetas`
--
ALTER TABLE `etiquetas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `FaixaCepAdministrativo`
--
ALTER TABLE `FaixaCepAdministrativo`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `FaixasCEP`
--
ALTER TABLE `FaixasCEP`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `FaixasCEP` ADD FULLTEXT KEY `titulo` (`titulo`);

--
-- Índices de tabela `fly_users`
--
ALTER TABLE `fly_users`
  ADD PRIMARY KEY (`fly_user_id`);

--
-- Índices de tabela `galeria`
--
ALTER TABLE `galeria`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `galeria_imagens`
--
ALTER TABLE `galeria_imagens`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `horario_especial`
--
ALTER TABLE `horario_especial`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `imagem_produto`
--
ALTER TABLE `imagem_produto`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `info_empresa`
--
ALTER TABLE `info_empresa`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `layout`
--
ALTER TABLE `layout`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `layout_email`
--
ALTER TABLE `layout_email`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `local_banner`
--
ALTER TABLE `local_banner`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `logo`
--
ALTER TABLE `logo`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `mesas`
--
ALTER TABLE `mesas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `pagamentos`
--
ALTER TABLE `pagamentos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `painel`
--
ALTER TABLE `painel`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `planos`
--
ALTER TABLE `planos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `prazo_bloqueio`
--
ALTER TABLE `prazo_bloqueio`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `ProdutosAdmin`
--
ALTER TABLE `ProdutosAdmin`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `prospectos`
--
ALTER TABLE `prospectos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `servicos`
--
ALTER TABLE `servicos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `sobrenos`
--
ALTER TABLE `sobrenos`
  ADD PRIMARY KEY (`ID`);

--
-- Índices de tabela `solicitar`
--
ALTER TABLE `solicitar`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `solicitar_produto`
--
ALTER TABLE `solicitar_produto`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tbl_uploads`
--
ALTER TABLE `tbl_uploads`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `templete`
--
ALTER TABLE `templete`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `templete_add`
--
ALTER TABLE `templete_add`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `test2`
--
ALTER TABLE `test2`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `token_notification`
--
ALTER TABLE `token_notification`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `UsersCardapio`
--
ALTER TABLE `UsersCardapio`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `UsersEndereco`
--
ALTER TABLE `UsersEndereco`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario_id`);

--
-- Índices de tabela `usuarios_admin`
--
ALTER TABLE `usuarios_admin`
  ADD PRIMARY KEY (`usuario_id`);

--
-- Índices de tabela `usuario_agenda`
--
ALTER TABLE `usuario_agenda`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `variacao_item`
--
ALTER TABLE `variacao_item`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `variacao_nome`
--
ALTER TABLE `variacao_nome`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `acesso_cliente`
--
ALTER TABLE `acesso_cliente`
  MODIFY `usuario_id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `adicional`
--
ALTER TABLE `adicional`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `ads`
--
ALTER TABLE `ads`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `afiliados`
--
ALTER TABLE `afiliados`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `algum_imagem`
--
ALTER TABLE `algum_imagem`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `arquivos`
--
ALTER TABLE `arquivos`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `atualizacao`
--
ALTER TABLE `atualizacao`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `avaliacoes`
--
ALTER TABLE `avaliacoes`
  MODIFY `id` smallint(9) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `boas_vindas`
--
ALTER TABLE `boas_vindas`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `cadastrofeed`
--
ALTER TABLE `cadastrofeed`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `cadastrofeed_varfilho`
--
ALTER TABLE `cadastrofeed_varfilho`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `cadastrofeed_varpai`
--
ALTER TABLE `cadastrofeed_varpai`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `categorias_administrativas`
--
ALTER TABLE `categorias_administrativas`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `categorias_imagem`
--
ALTER TABLE `categorias_imagem`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `categoria_produtos`
--
ALTER TABLE `categoria_produtos`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `colaborador`
--
ALTER TABLE `colaborador`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `ComandaAdicional`
--
ALTER TABLE `ComandaAdicional`
  MODIFY `IdAdicional` smallint(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `ComandaId`
--
ALTER TABLE `ComandaId`
  MODIFY `id` smallint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `ComandaPedidos`
--
ALTER TABLE `ComandaPedidos`
  MODIFY `IdPedido` smallint(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `ComandaTaxas`
--
ALTER TABLE `ComandaTaxas`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `ComandaVariacoes`
--
ALTER TABLE `ComandaVariacoes`
  MODIFY `IdVariacao` smallint(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `config_fly`
--
ALTER TABLE `config_fly`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `config_pagamento`
--
ALTER TABLE `config_pagamento`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `FaixaCepAdministrativo`
--
ALTER TABLE `FaixaCepAdministrativo`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `FaixasCEP`
--
ALTER TABLE `FaixasCEP`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `fly_users`
--
ALTER TABLE `fly_users`
  MODIFY `fly_user_id` smallint(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `galeria`
--
ALTER TABLE `galeria`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `galeria_imagens`
--
ALTER TABLE `galeria_imagens`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `horario_especial`
--
ALTER TABLE `horario_especial`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `imagem_produto`
--
ALTER TABLE `imagem_produto`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `info_empresa`
--
ALTER TABLE `info_empresa`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `layout`
--
ALTER TABLE `layout`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `layout_email`
--
ALTER TABLE `layout_email`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `local_banner`
--
ALTER TABLE `local_banner`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `logo`
--
ALTER TABLE `logo`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `mesas`
--
ALTER TABLE `mesas`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `pagamentos`
--
ALTER TABLE `pagamentos`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `painel`
--
ALTER TABLE `painel`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `planos`
--
ALTER TABLE `planos`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `prazo_bloqueio`
--
ALTER TABLE `prazo_bloqueio`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `ProdutosAdmin`
--
ALTER TABLE `ProdutosAdmin`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `prospectos`
--
ALTER TABLE `prospectos`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `servicos`
--
ALTER TABLE `servicos`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `sobrenos`
--
ALTER TABLE `sobrenos`
  MODIFY `ID` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de tabela `solicitar`
--
ALTER TABLE `solicitar`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `solicitar_produto`
--
ALTER TABLE `solicitar_produto`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbl_uploads`
--
ALTER TABLE `tbl_uploads`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `templete`
--
ALTER TABLE `templete`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `templete_add`
--
ALTER TABLE `templete_add`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=189;

--
-- AUTO_INCREMENT de tabela `test`
--
ALTER TABLE `test`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT de tabela `test2`
--
ALTER TABLE `test2`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `token`
--
ALTER TABLE `token`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `token_notification`
--
ALTER TABLE `token_notification`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `UsersCardapio`
--
ALTER TABLE `UsersCardapio`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `UsersEndereco`
--
ALTER TABLE `UsersEndereco`
  MODIFY `id` smallint(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuario_id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuarios_admin`
--
ALTER TABLE `usuarios_admin`
  MODIFY `usuario_id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuario_agenda`
--
ALTER TABLE `usuario_agenda`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de tabela `variacao_item`
--
ALTER TABLE `variacao_item`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `variacao_nome`
--
ALTER TABLE `variacao_nome`
  MODIFY `id` smallint(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `video`
--
ALTER TABLE `video`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
