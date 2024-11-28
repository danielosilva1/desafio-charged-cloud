# Teste Técnico para Vaga na Charged Cloud

## Objetivo
Desenvolver uma aplicação web utilizando Nest.js, Vite e MySQL que permita gerenciar (cadastrar, consultar, atualizar e excluir) empresas.

<br></br>
## Tabela de Conteúdos

1. [Especificação dos Requisitos Funcionais - Histórias de Usuário](#Especificação-dos-Requisitos-Funcionais)
    - [Fazer Login/logout via Google Auth 2.0](#Fazer-Login/logout-via-Google-Auth-2.0)
    - [Cadastrar Empresa](#Cadastrar-Empresa)
    - [Consultar Empresas](#Consultar-Empresas)
    - [Atualizar Empresa](#Atualizar-Empresa)
    - [Deletar Empresa](#Deletar-Empresa)
    - [Cadastrar Endereço (⭐ EXTRA)](#Cadastrar-Endereço-(⭐-EXTRA))
    - [Consultar Endereço (⭐ EXTRA)](#Consultar-Endereço-(⭐-EXTRA))
    - [Especificação completa das Histórias de Usuário (Trello)](#-A-especificação-das-histórias-de-usuário-e-a-gestão-dos-cards-foram-realizadas-no-trello-e-podem-ser-acessadas-aqui)
2. [Definição de Diagrama Entidade Relacionamento](#Definição-de-um-Diagrama-Entidade-Relacionamento)
    - [📋 Discussão sobre decisão técnica](#-Decisão-Técnica-Relacionamento-entre-Empresa-e-Endereço)
3. [Instruções para Execução do Projeto](#Instruções-de-Execução)

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


<br></br>
# Instruções de Execução

⚙️: O arquivo .env foram disponibilizados à empresa;

Após adicionar o .env do backend na raiz do projeto, execute (via terminal e na raiz do projeto):
```
npm run start:dev
```
No navegador, acesse: [http://localhost:3000/api/auth/google/login](http://localhost:3000/api/auth/google/login).
