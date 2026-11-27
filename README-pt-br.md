<p align="center">
  <b>Português</b> | <a href="https://github.com/rafaznj/ticksy/blob/main/README.md">English</a>
</p>

# Ticksy

Sistema de help desk para criar, atribuir e acompanhar tickets de suporte, com dashboard de métricas e notificações.

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="frontend/src/assets/images/black-theme/home.gif">
    <img src="frontend/src/assets/images/light-theme/home.gif" width="100%" alt="Tela inicial do Ticksy">
  </picture>
</p>

## Sobre

O Ticksy é um sistema de help desk full-stack que cobre todo o ciclo de vida de um ticket: criação, atribuição e mudança de status. Cada etapa gera notificações para as pessoas envolvidas, e o acesso às telas e ações varia conforme o perfil do usuário.

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=flat-square">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=flat-square">
  <img alt="NestJS" src="https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white&style=flat-square">
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white&style=flat-square">
  <img alt="Drizzle ORM" src="https://img.shields.io/badge/Drizzle_ORM-C5F74F?logo=drizzle&logoColor=black&style=flat-square">
  <img alt="Jest" src="https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white&style=flat-square">
  <img alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=flat-square">
</p>

## Como surgiu a ideia

O Ticksy nasceu como um projeto pessoal para construir uma aplicação completa de ponta a ponta: autenticação, modelagem de dados relacional, API tipada, frontend moderno e deploy real. Um help desk foi uma ótima escolha porque reúne naturalmente perfis de usuário, mudanças de estado, dashboards e notificações.

## Perfis de usuário

| Perfil | O que faz |
| --- | --- |
| `employee` | Abre tickets e acompanha o andamento dos seus próprios chamados |
| `technical_assistance` | Recebe os tickets atribuídos a ele e marca como resolvidos |
| `admin` | Gerencia usuários, atribui tickets e acompanha as métricas do sistema |

## Arquitetura & Decisões de Design

O Ticksy foi desenhado aplicando rigorosamente princípios de **Clean Architecture**, **SOLID** e **desacoplamento**, garantindo facilidade de manutenção, testabilidade e separação clara de responsabilidades.

### Arquitetura do Backend (NestJS)

- **Monólito Modular por Domínio (DDD):** A aplicação é particionada em módulos de negócio coesos (`auth`, `ticket`, `user`, `notification`). Cada módulo encapsula seus próprios controllers, services, repositories, DTOs e view-models.
- **Inversão de Dependência (DIP):** Services e Repositories dependem de contratos/interfaces explícitas, desacopladas através de tokens únicos de injeção de dependência (`SERVICE_TOKENS` e `REPOSITORY_TOKENS`). Módulos se comunicam via interfaces, sem acoplamento a implementações concretas.
- **Princípio da Responsabilidade Única (SRP):** Cada caso de uso é isolado em um serviço com um único método `execute(...)` (ex.: `AssignTicketService`, `LoginService`, `AutoAssignTicketService`).
- **Padrão Repository com Drizzle ORM:** A camada de persistência é abstraída em repositórios dedicados usando o Drizzle ORM, permitindo queries fortemente tipadas (`type-safe SQL`), zero duplicação de schema e performance comparável a queries SQL nativas, sem a sobrecarga de ORMs tradicionais.
- **Agendamento em Background (Cron Jobs):** Utiliza o `@nestjs/schedule`. Os arquivos de Job atuam apenas como gatilhos de entrada (*adapters* semelhantes a Controllers) que disparam Services de domínio. Como exemplo prático, o `AutoAssignTicketsJob` executa diariamente para distribuir tickets sem vínculo entre os técnicos, respeitando balanceamento de carga e um limite rígido de WIP (*Work-In-Progress*) de no máximo 5 tickets ativos simultâneos por técnico.
- **Notificações em Tempo Real com SSE:** Server-Sent Events (SSE) são utilizados para entregar notificações tipadas em tempo real aos clientes, com menor overhead e complexidade em relação a WebSockets.
- **Tratamento Global de Exceções:** Erros de domínio (`AppException`) são interceptados por um `GlobalExceptionFilter`, padronizando respostas de erro, mensagens internacionalizadas e status codes HTTP em toda a API.

### Arquitetura do Frontend (React)

- **Injeção de Dependência no Client (InversifyJS):** Services e repositórios de API na camada `modules/` são instanciados e resolvidos através de um container InversifyJS, desacoplando regras de comunicação da interface gráfica.
- **Gerenciamento de Estado de Servidor (TanStack Query):** Cache de requisições, mutações otimistas, revalidação e controle de paginação são centralizados com TanStack Query.
- **Estado Global Leve (Zustand):** Sessão de autenticação e dados do usuário logado gerenciados de forma enxuta via `useAuthStore`.
- **Roteamento Tipado (TanStack Router):** Rotas declarativas e type-safe com validação de parâmetros de busca (*search params*) e guards para rotas autenticadas.
- **Design System & Acessibilidade:** Construído com Tailwind CSS, primitivos Radix UI e componentes shadcn/ui, com suporte completo a alternância de temas claro/escuro (`next-themes`) e múltiplos idiomas (`i18next`: PT-BR / EN).

---

## Testes Unitários

O projeto utiliza o **Jest** em conjunto com `@nestjs/testing` para testes unitários isolados, rápidos e focados em regras de negócio críticas e segurança.

### Estratégia de Testes

- **Subpastas Dedicadas por Camada:** Os testes unitários ficam organizados em subpastas `__tests__/` dentro da própria camada (ex.: `src/modules/ticket/services/__tests__/assign.service.spec.ts`), mantendo os testes próximos ao código correspondente sem misturar extensões na mesma listagem.
- **Validação de Injeção de Dependência (DI):** Os testes constroem um `TestingModule` em memória para garantir que a resolução de dependências do NestJS funcione via tokens (`SERVICE_TOKENS`, `REPOSITORY_TOKENS`).
- **Isolamento Total & Mocks:** Dependências externas (banco de dados, serviços de notificação e bibliotecas de criptografia como `argon2`) são mockadas utilizando `jest.fn()` e `jest.mock()`. Isso elimina a necessidade de infraestrutura ativa e permite que a suíte rode em milissegundos.
- **Separação Clara (Unitários vs. E2E):**
  - `src/**/__tests__/*.spec.ts`: Testes unitários para regras de negócio, lançamentos de exceções e efeitos colaterais.
  - `backend/test/*.e2e-spec.ts`: Testes de integração End-to-End com `supertest` sobre a aplicação NestJS completa.

### Executando os Testes

```bash
# Entrar na pasta do backend
cd backend

# Executar todos os testes unitários
pnpm test

# Executar testes em modo watch (re-executa ao salvar)
pnpm test:watch

# Gerar relatório de cobertura de código
pnpm test:cov

# Executar testes E2E
pnpm test:e2e
```

---

## Funcionalidades

### Home

Todos os perfis veem cards com a quantidade de tickets por status e a lista dos tickets criados pelo próprio usuário nos últimos sete dias.

No painel do admin, a Home também traz gráficos com a distribuição dos tickets por status e a lista de todos os tickets criados nos últimos sete dias.

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="frontend/src/assets/images/black-theme/home.gif">
    <img src="frontend/src/assets/images/light-theme/home.gif" width="100%" alt="Home">
  </picture><br>
  <sub><b>Home</b></sub>
</p>

### Criar ticket

Formulário para abrir um novo chamado, disponível para o perfil `employee`.

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="frontend/src/assets/images/black-theme/create-ticket.gif">
    <img src="frontend/src/assets/images/light-theme/create-ticket.gif" width="100%" alt="Criar ticket">
  </picture><br>
  <sub><b>Criar ticket</b></sub>
</p>

### Tickets

Listagem paginada dos tickets, com atribuição a técnicos, remoção de atribuição, edição, exclusão e resolução, de acordo com o perfil de cada usuário.

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="frontend/src/assets/images/black-theme/tickets.gif">
    <img src="frontend/src/assets/images/light-theme/tickets.gif" width="100%" alt="Tickets">
  </picture><br>
  <sub><b>Tickets</b></sub>
</p>

### Usuários

Área do admin para listar, ativar, desativar e visualizar os usuários do sistema.

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="frontend/src/assets/images/black-theme/users.gif">
    <img src="frontend/src/assets/images/light-theme/users.gif" width="100%" alt="Usuários">
  </picture><br>
  <sub><b>Usuários</b></sub>
</p>

### Notificações

As notificações são tipadas (`ticket_created`, `ticket_assigned`, `ticket_unassigned`, `ticket_status_changed`), entregues individualmente aos destinatários, em tempo real via SSE (Server-Sent Events), e com controle de leitura por usuário.

- **Admin:** é avisado quando um ticket é criado e quando é resolvido.
- **Assistência técnica:** é avisada quando um ticket é atribuído a ele.
- **Funcionário:** é avisado quando o status do seu ticket muda e quando ele é resolvido.

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="frontend/src/assets/images/black-theme/notifications.gif">
    <img src="frontend/src/assets/images/light-theme/notifications.gif" width="100%" alt="Notificações">
  </picture><br>
  <sub><b>Notificações</b></sub>
</p>

### Sidebar

Permite editar o perfil do usuário e alternar entre os temas claro e escuro e entre os idiomas português e inglês.

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="frontend/src/assets/images/black-theme/sidebar.gif">
    <img src="frontend/src/assets/images/light-theme/sidebar.gif" width="100%" alt="Sidebar">
  </picture><br>
  <sub><b>Sidebar</b></sub>
</p>

## Como acessar

**Teste online:** [https://ticksy.rafaelsena.dev](https://ticksy.rafaelsena.dev)

Ou rode localmente seguindo as instruções abaixo.

## Rodando localmente

### Opção 1: Com Docker Compose (Recomendado)

A forma mais rápida de subir todo o ecossistema (PostgreSQL, Backend e Frontend) em contêineres isolados:

```bash
# 1. Clone o repositório
git clone https://github.com/rafaznj/ticksy.git

# 2. Entre na pasta do projeto
cd ticksy

# 3. Configure as variáveis de ambiente do backend
# (você pode copiar do backend/.env.example para backend/.env)
cp backend/.env.example backend/.env

# 4. Suba todos os serviços com build
docker compose up --build -d
```

O Docker irá:
- Inicializar o banco de dados **PostgreSQL** com volume persistente.
- Compilar o **Backend** NestJS, aplicar automaticamente as migrations do Drizzle e expor a API na porta `4002`.
- Gerar o build de produção do **Frontend** e servi-lo via **Nginx** na porta `5173`.

Para parar os contêineres:
```bash
docker compose down
```

---

### Opção 2: Manualmente com pnpm

O projeto é um monorepo com pnpm: as dependências são instaladas uma única vez, na raiz.

```bash
# 1. Clone o repositório
git clone https://github.com/rafaznj/ticksy.git

# 2. Entre na pasta do projeto
cd ticksy

# 3. Instale as dependências (na raiz do monorepo)
pnpm install

# 4. Configure as variáveis de ambiente (veja os arquivos .env.example)

# 5. Rode as migrations (dentro da pasta do backend)
cd backend
pnpm migrate
cd ..

# 6. Rode o frontend e o backend juntos (na raiz)
pnpm dev
```

O frontend ficará disponível em `http://localhost:5173` (porta padrão do Vite).

Para rodar cada parte separadamente, você pode usar os scripts da raiz:

```bash
pnpm dev:frontend
pnpm dev:backend
```

Ou entrar em cada pasta (`frontend/` ou `backend/`) e rodar `pnpm dev`.

## Usuários de teste (seed)

O sistema cria automaticamente três usuários de seed, um para cada perfil, para você explorar o app sem precisar se cadastrar:

| Perfil | Nome | E-mail | Senha |
| --- | --- | --- | --- |
| `employee` | Employee | `employee@email.com` | `@Aa12345` |
| `technical_assistance` | Technical Assistance | `technical_assistance@email.com` | `@Aa12345` |
| `admin` | Administrator | `admin@email.com` | `@Aa12345` |

## Documentação da API (Swagger)

A API do backend é documentada com Swagger, e você pode explorar e testar os endpoints direto pelo navegador:

- **Local:** acesse `/docs` no endereço em que o backend estiver rodando (por exemplo, `http://localhost:4002/docs`)
- **Produção:** [https://ticksy-backend-sapr.onrender.com/docs](https://ticksy-backend-sapr.onrender.com/docs)

## Estrutura

```
.
├── docker-compose.yml                                      # Orquestração dos serviços (PostgreSQL, Backend e Frontend)
├── frontend/
│   ├── Dockerfile                                          # Build multi-stage do frontend e imagem Nginx
│   ├── nginx.conf                                          # Configuração de SPA e cache no Nginx
│   └── src/
│       ├── assets/
│       │   └── images/
│       │       ├── light-theme/                            # GIFs do README (tema claro)
│       │       └── black-theme/                            # GIFs do README (tema escuro)
│       ├── components/
│       │   ├── auth/                                       # AuthCarousel
│       │   ├── dashboard/                                  # Métricas de Admin, Employee e Technical Assistance
│       │   ├── form/                                       # Campos dos formulários (TanStack Form)
│       │   ├── layouts/                                    # Sidebar
│       │   ├── preferences/                                # Alternância de tema e idioma
│       │   ├── tables/                                     # Infinite list, paged table e tabelas de users, tickets e notifications
│       │   └── ui/                                         # Componentes primitivos do shadcn/ui
│       ├── forms/                                          # Todos os formulários do sistema
│       │   ├── auth/
│       │   ├── tickets/
│       │   └── users/
│       ├── hooks/
│       ├── infrastructure/                                 # Interceptors
│       ├── lib/                                            # Definições, tipagens e container de injeção de dependência (Inversify) das libs utilizadas
│       ├── modules/                                        # Services, repositories, query hooks, enums, DTOs e tipagens das entidades
│       │   ├── auth/
│       │   ├── tickets/
│       │   ├── users/
│       │   └── notifications/
│       ├── pages/                                          # Todas as páginas do sistema
│       ├── routes/                                         # Rotas do sistema
│       └── shared/                                         # Arquivos compartilhados
|
|
├── backend/                                             
│   ├── .env.example                                        # Exemplo de como devem ser as variáveis de ambiente
│   ├── Dockerfile                                          # Build multi-stage da API NestJS com migrations automáticas
│   ├── setup.ts                                            # Script de setup do projeto
│   └── src/
│       ├── database/
│       │   ├── config.ts                                   # Configuração da conexão com o banco
│       │   ├── tokens.ts                                   # Tokens de injeção do banco
│       │   └── drizzle/
│       │       ├── migrations/                             # Migrations SQL e metadados
│       │       ├── schema/                                 # Tabelas: users, tickets, notifications, notification-recipients e refresh-tokens
│       │       └── utils/                                  # Utilitários (ex.: to-pg-enum)
│       ├── modules/                                       
│       │   ├── auth/                                       # Autenticação JWT: login, registro, refresh e logout
│       │   ├── ticket/                                     # Criação, atribuição, resolução e consultas de tickets
│       │   ├── user/                                       # Gestão de usuários: cadastro, ativação, desativação e convite
│       │   └── notification/                               # Notificações: criação, listagem, contagem e marcação como lida
│       └── shared/                                         # Código compartilhado entre os módulos
│           ├── base/                                       # Repositories e services genéricos reutilizados pelos módulos
│           ├── config/                                     # Configuração do JWT e do Swagger
│           ├── di/                                         # Tokens de injeção de dependência de repositories e services
│           ├── exceptions/                                 # Exceção customizada da aplicação
│           ├── filters/                                    # Filtro global de exceções
│           ├── interfaces/                                 # Tipos compartilhados (respostas, erros, paginação e opções de consulta)
│           └── utils/                                      # Helpers de paginação, ordenação, filtros, respostas, cookie de refresh e geração de senha
|
├── eslint.config.js                                        # ESLint (flat config) na raiz do monorepo
```

## Ideias de melhoria

- [ ] Workspaces: um espaço isolado para cada organização, com seus próprios usuários, tickets e métricas
- [ ] Comentários e histórico de alterações em cada ticket
- [ ] Anexos de imagens e arquivos nos tickets
