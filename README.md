# Teste Técnico para Vaga na Charged Cloud

## Objetivo
Desenvolver uma aplicação web utilizando Nest.js, Vite e MySQL que permita gerenciar (cadastrar, consultar, atualizar e excluir) empresas.

<br></br>
## Tabela de Conteúdos

1. [Especificação dos Requisitos Funcionais - Histórias de Usuário](#Especificação-dos-Requisitos-Funcionais)
    - [Fazer Login/logout via Google Auth 2.0](#Título-Fazer-Loginlogout-via-Google-Auth-20)
    - [Cadastrar Empresa](#Título-Cadastrar-Empresa)
    - [Consultar Empresas](#Título-Consultar-Empresas)
    - [Atualizar Empresa](#Título-Atualizar-Empresa)
    - [Deletar Empresa](#Título-Deletar-Empresa)
    - [Cadastrar Endereço (⭐ EXTRA)](#Título-Cadastrar-Endereço--EXTRA)
    - [Consultar Endereço (⭐ EXTRA)](#Título-Consultar-Endereço--EXTRA)
    - [Especificação completa das Histórias de Usuário (Trello)](#-A-especificação-das-histórias-de-usuário-e-a-gestão-dos-cards-foram-realizadas-no-trello-e-podem-ser-acessadas-aqui)
2. [Definição de Diagrama Entidade Relacionamento](#Definição-de-um-Diagrama-Entidade-Relacionamento)
    - [📋 Discussão sobre decisão técnica](#-Decisão-Técnica-Relacionamento-entre-Empresa-e-Endereço)
3. [Instruções para Instalação e Execução do Projeto](#Instruções-de-Instalação-e-Execução-Localmente)
    - [Configuração do Banco MySQL Localmente](#Configurando-o-banco-de-dados-MySQL-localmente)
    - [Instalação e Execução do Projeto Localmente](#Instalando-e-executando-o-projeto)

<br></br>
# Especificação dos Requisitos Funcionais

Com base na especificação da aplicação, foi possível obter as seguintes histórias de usuário:

### Título: Fazer Login/logout via Google Auth 2.0

Como **usuário da aplicação**

eu quero **fazer login/logout usando a autenticação do Google (OAuth 2.0)**

para **acessar as rotas protegidas da aplicação**

**Critério (s) de aceitação:**

1. O usuário deve ter o acesso validado (negado ou permitido) após logar via conta do Google.


### Título: Cadastrar Empresa

Como **usuário autenticado**

eu quero **cadastrar uma empresa**

para **adicionar uma nova empresa ao banco de dados**

**Critério (s) de aceitação:**

1. Os campos CNPJ, nome, endereço e telefone devem ser obrigatórios;

2. O CNPJ de uma empresa só pode aparecer em um único registro;

3. Os dados devem ser persistidos no banco de dados MySQL;

4. Apenas usuários autenticados podem cadastrar uma empresa.


### Título: Consultar Empresas

Como **usuário autenticado**

eu quero **consultar empresas usando filtros de busca**

para **visualizar todas as empresas que se enquadrem no filtro definido**

**Critério (s) de aceitação:**

1. O usuário deve poder filtrar por CNPJ ou nome (⭐ EXTRA);

1. Se nenhum critério de busca for informado, o usuário deve receber os dados de todas as empresas. Caso contrário, deve receber os dados das empresas de acordo com os critérios de filtragem;

2. Apenas usuários autenticados podem consultar empresa.


### Título: Atualizar Empresa

Como **usuário autenticado**

eu quero **atualizar uma empresa**

para **atualizar/corrigir os dados de uma empresa**

**Critério (s) de aceitação:**

1. Os campos CNPJ, nome, endereço e telefone devem ser obrigatórios;

2. O CNPJ de uma empresa só pode aparecer em um único registro;

3. Apenas usuários autenticados podem atualizar uma empresa.


### Título: Deletar Empresa

Como **usuário autenticado**

eu quero **deletar uma empresa**

para **remover uma empresa do banco de dados**

**Critério (s) de aceitação:**

1. Apenas usuários autenticados podem excluir uma empresa.


### Título: Cadastrar Endereço (⭐ EXTRA)

Como **usuário autenticado**

eu quero **cadastrar um novo endereço**

para **defini-lo com endereço de uma empresa**

**Critério (s) de aceitação:**

1. Apenas usuários autenticados podem cadastrar um endereço.


### Título: Consultar Endereço (⭐ EXTRA)

Como **usuário autenticado**

eu **quero consultar todos os endereços**

para **listar todos os endereços no banco de dados**

**Critério (s) de aceitação:**

1. Apenas usuários autenticados podem consultar endereços endereço.

#### 🔗 A especificação das histórias de usuário e a gestão dos cards foram realizadas no Trello e podem ser acessadas [aqui](https://trello.com/invite/b/674487f82f09cfbb7a39a1e1/ATTI0142def8be8178ae2f1e1993f4599bdbDBA6962E/desafio-charged-cloud-backend).



<br></br>
# Definição de um Diagrama Entidade Relacionamento

![Imagem contendo o Diagrama Entidade Relacionamento](<documentation/Diagrama Entidade Relacionamento.jpg>)

#### 📋 Decisão Técnica: Relacionamento entre Empresa e Endereço

Inicialmente, eu acreditava que um endereço poderia abrigar apenas uma empresa. Nesse caso, o relacionamento entre Empresa e Endereço seria um-para-um. Nesse cenário, a ideia inicial seria adicionar os dados de endereço na mesma tabela da Empresa para evitar a necessidade de junção de tabelas em eventuais buscas por endereço. Veja que isso não geraria redundância de endereços na tabela Empresa pois, teoricamente, cada empresa teria um endereço diferente.

No entanto, observei que um endereço pode, sim, abrigar mais de uma empresa (veja a fundamentação legal [aqui](https://www.jlramos.com.br/blog/e-possivel-ter-duas-ou-mais-empresas-no-mesmo-endereco-entenda-regras-e-limitacoes/)). Nesse caso, a ideia inicial poderia gerar redundância de endereços no banco. Portanto, optei por criar a tabela Endereço e definir um relacionamento entre Empresa e Endereço de forma que a ideia *"uma empresa está localizada em um único endereço e um endereço pode abrigar 0 ou mais empresas"* pudesse ser expressa.


# Sobre o Auth 2.0

Esse requisito não foi finalizado. A implementação no backend foi realizada e a autenticação funciona se a requisição for enviada diretamente do navegador. Porém, na etapa de integração com o frontend, obtive um erro de CORS que ainda não consegui superar.

Tentei enviar as requisições via fetch, mas sem sucesso. Adicionalmente, também adicionei o arquivo de configuração de CORS à Google Cloud Storage na tentativa de que o redirecionamento envolvendo o serviço de autenticação não fosse barrado, mas novamente não adiantou.

Dessa forma, aproximando-se do prazo final para conclusão do desafio, achei por bem dedicar-me à conclusão desse relatório e à revisão do projeto.

Os demais requisitos da especificação foram implementados e integrados com o frontend (veja algumas imagens de telas abaixo)

# Resultados

Executando o código disponível na main (com implementação da autenticação) todas as telas (com exceção da inicial, que é pública) mostrarão em algum momento avisos como os das imagens abaixo.

![alt text](documentation/erro-busca-empresas.png)

![alt text](documentation/erro-cadastro-endereco.png)

<br></br>

<br></br>
# Instruções de Instalação e Execução Localmente

## Configurando o banco de dados MySQL localmente
Altere os campos DATABASE_USERNAME, DATABASE_PASSWORD e DATABASE_NAME no arquivo .env fornecido para o usuário, senha e nome do banco do seu banco MySQL local

## Instalando e executando o projeto
1. Clone o projeto para a sua máquina;
2. Adicione na raiz do projeto o arquivo .env disponibilizado;
3. Instale as dependências do projeto;
4. Rode o projeto
    
    No diretório raiz, execute:
    ```
    npm run start:dev
    ```
5. Execute o projeto
    - Sem integração com front
    
        No navegador, acesse: [http://localhost:3000/api/auth/google/login](http://localhost:3000/api/auth/google/login)
    
    - Com integração com front
        
        Acesse o repositório do frontend disponível [aqui](https://github.com/danielosilva1/desafio-charged-cloud-frontend) e siga as instruções de instalação/execução disponíveis lá