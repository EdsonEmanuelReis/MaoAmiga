# 🤝 Mão Amiga

> Tecnologia e acessibilidade para tornar o dia a dia mais simples, seguro e independente.

## 📌 Sobre o projeto

O **Mão Amiga** é um projeto acadêmico voltado ao desenvolvimento de uma solução tecnológica acessível para auxiliar pessoas idosas e pessoas com baixa visão em tarefas do dia a dia.

A proposta surgiu a partir da identificação de dificuldades relacionadas à utilização de smartphones, principalmente quando interfaces apresentam textos pequenos, muitos elementos na tela ou funções pouco intuitivas.

O projeto busca utilizar tecnologia para **simplificar a interação com o dispositivo**, facilitar o acesso a informações e oferecer recursos que possam contribuir para maior autonomia do usuário.

O desenvolvimento é realizado como parte de um projeto universitário relacionado ao **ODS 3 — Saúde e Bem-Estar**.

---

## 🎯 Objetivo

Desenvolver uma solução tecnológica com foco em **acessibilidade, simplicidade e facilidade de uso**, considerando principalmente as necessidades de pessoas idosas e usuários com baixa visão.

Entre os objetivos estão:

* Facilitar a utilização de recursos digitais.
* Reduzir a complexidade da interface.
* Melhorar a visualização de textos e elementos.
* Organizar informações importantes de maneira simples.
* Permitir o gerenciamento de informações relacionadas à rotina e responsáveis.
* Explorar recursos de inteligência artificial para interação por comandos de voz.
* Desenvolver uma solução considerando princípios de acessibilidade.

---

## 👥 Público-alvo

O projeto é direcionado principalmente para:

* Pessoas idosas, especialmente usuários a partir de 60 anos.
* Pessoas com baixa visão.
* Usuários que apresentam dificuldade na utilização de interfaces digitais convencionais.
* Familiares ou responsáveis que auxiliam esses usuários.

---

## 💡 Problema

A utilização de smartphones pode apresentar dificuldades para determinados usuários devido a fatores como:

* Textos pequenos;
* Ícones difíceis de identificar;
* Excesso de informações na tela;
* Navegação pouco intuitiva;
* Dificuldade para localizar aplicativos e funções;
* Dificuldade na realização de determinadas tarefas digitais.

O Mão Amiga busca abordar esses problemas através de uma interface mais simples e recursos voltados à acessibilidade.

---

## 🚀 Funcionalidades

### Atualmente implementadas

* [x] Estrutura inicial do sistema.
* [x] Backend desenvolvido com Spring Boot.
* [x] Integração com banco de dados MySQL.
* [x] CRUD de responsáveis.
* [x] CRUD de rotina.
* [x] API REST.
* [x] Frontend integrado ao backend.
* [x] Cadastro de responsáveis pela interface.
* [x] Visualização de responsáveis.
* [x] Cadastro de atividades da rotina.
* [x] Visualização da rotina.
* [x] Recurso inicial para aumento do tamanho do texto.
* [x] Mensagens de sucesso e erro diretamente na interface.

### Em desenvolvimento

* [ ] Integração dos demais módulos do banco de dados.
* [ ] Desenvolvimento dos CRUDs restantes.
* [ ] Integração dos novos módulos com o frontend.
* [ ] Recursos de inteligência artificial.
* [ ] Comandos de voz.
* [ ] Abertura de aplicativos através de comandos.
* [ ] Testes adicionais de acessibilidade.
* [ ] Refinamento da interface.

---

## 🏗️ Arquitetura

O backend utiliza uma arquitetura organizada em camadas:

```text
Frontend
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Repository
   │
   ▼
JPA / Hibernate
   │
   ▼
MySQL
```

### Controller

Responsável por receber as requisições HTTP e disponibilizar os endpoints da API.

### Service

Responsável pelas regras de negócio e validações.

### Repository

Responsável pela comunicação com o banco de dados através do Spring Data JPA.

### Model

Representa as entidades utilizadas pelo sistema e seus respectivos dados.

### Banco de dados

Responsável pelo armazenamento persistente das informações da aplicação.

---

## 🛠️ Tecnologias utilizadas

### Backend

* Java
* Spring Boot
* Spring Data JPA
* Hibernate
* Maven
* Lombok
* API REST

### Banco de dados

* MySQL
* SQL

### Frontend

* HTML5
* CSS3
* JavaScript

### Ferramentas

* IntelliJ IDEA
* Insomnia
* Git
* GitHub

---

## 📡 API

O projeto possui uma API REST para comunicação entre o frontend e o backend.

### Responsáveis

| Método | Endpoint                            | Função                    |
| ------ | ----------------------------------- | ------------------------- |
| POST   | `/responsavel/cadastrarResponsavel` | Cadastrar responsável     |
| GET    | `/responsavel/listarResponsavel`    | Listar responsáveis       |
| GET    | `/responsavel/buscarIdResponsavel`  | Buscar responsável por ID |
| PUT    | `/responsavel/atualizarResponsavel` | Atualizar responsável     |
| DELETE | `/responsavel/deletarResponsavel`   | Excluir responsável       |

### Rotina

| Método | Endpoint                  | Função                     |
| ------ | ------------------------- | -------------------------- |
| POST   | `/rotina/registrarRotina` | Cadastrar atividade        |
| GET    | `/rotina/listarRotina`    | Listar atividades          |
| GET    | `/rotina/...`             | Demais operações do módulo |

> A documentação completa dos endpoints será atualizada conforme os módulos restantes forem implementados.

---

## ♿ Acessibilidade

A acessibilidade é um dos principais pontos do projeto.

A interface foi desenvolvida considerando usuários que podem apresentar dificuldades de visualização ou utilização de interfaces convencionais.

Entre as decisões atuais estão:

* Textos com tamanho ampliado;
* Botões grandes;
* Interface simplificada;
* Organização visual dos recursos;
* Linguagem mais direta;
* Feedback visual para operações;
* Recurso de aumento do tamanho do texto;
* Adaptação para telas menores.

O projeto também considera recomendações e princípios de acessibilidade da Web Accessibility Initiative (WAI/W3C).

---

## 🧪 Testes

Os módulos já desenvolvidos foram testados individualmente através do Insomnia e também através da interface web.

### Responsável

* [x] Cadastro
* [x] Listagem
* [x] Busca por ID
* [x] Atualização
* [x] Exclusão
* [x] Validação de campos
* [x] Validação de CPF duplicado

### Rotina

* [x] Cadastro
* [x] Listagem
* [x] Integração com frontend
* [x] Validação básica

### Frontend

* [x] Navegação entre telas
* [x] Cadastro de responsável
* [x] Visualização de responsáveis
* [x] Cadastro de atividade
* [x] Visualização da rotina
* [x] Aumento do tamanho do texto
* [x] Mensagens de sucesso e erro
* [x] Adaptação para telas menores

> Novos casos de teste serão adicionados conforme os demais módulos forem integrados.

---

## 📂 Estrutura da documentação

A documentação técnica do projeto está organizada na pasta `docs/`.

```text
docs/
├── 01-visao-geral.md
├── 02-requisitos.md
├── 03-arquitetura.md
├── 04-banco-de-dados.md
├── 05-api.md
├── 06-frontend.md
├── 07-acessibilidade.md
├── 08-testes.md
├── 09-equipe.md
└── 10-proximos-passos.md
```

---

## 👨‍💻 Equipe

O projeto é desenvolvido por uma equipe multidisciplinar, envolvendo desenvolvimento backend, frontend, banco de dados, inteligência artificial e testes.

| Integrante | Responsabilidade              |
| ---------- | ----------------------------- |
| Edson      | Backend / API / Integração    |
| Lucas      | Backend / Testes              |
| Luiza      | Inteligência Artificial       |
| Diego      | Inteligência Artificial       |
| Karlla     | Frontend / Interface / Testes |
| Rafael     | Em definição                  |

> As responsabilidades poderão ser atualizadas conforme a evolução do projeto.

---

## 📈 Evolução do projeto

O desenvolvimento ocorre de forma incremental.

### Etapa 1 — Estrutura e banco

* Criação do projeto Spring Boot.
* Configuração do banco MySQL.
* Criação das entidades.
* Implementação das primeiras tabelas.

### Etapa 2 — Backend

* Implementação dos repositories.
* Implementação dos services.
* Implementação dos controllers.
* Criação dos endpoints REST.
* Testes através do Insomnia.

### Etapa 3 — Frontend

* Criação da interface web.
* Integração com a API.
* Implementação das telas de responsáveis e rotina.
* Recursos iniciais de acessibilidade.

### Etapa 4 — Expansão

* Integração dos módulos desenvolvidos pelos demais integrantes.
* Implementação dos CRUDs restantes.
* Integração com frontend.
* Desenvolvimento da inteligência artificial.
* Implementação dos comandos de voz.

### Etapa 5 — Validação

* Testes funcionais.
* Testes de acessibilidade.
* Correção de bugs.
* Testes com usuários.
* Refinamento da interface.

---

## 🔮 Próximos passos

* Finalizar os módulos do banco de dados.
* Implementar os respectivos módulos no backend.
* Integrar todos os CRUDs.
* Expandir o frontend.
* Desenvolver a funcionalidade de comandos de voz.
* Integrar inteligência artificial.
* Realizar testes de usabilidade e acessibilidade.
* Melhorar a documentação.
* Preparar a versão final para apresentação.

---

## 📚 Documentação técnica

Para informações mais detalhadas, consulte:

* [Visão geral](docs/01-visao-geral.md)
* [Requisitos](docs/02-requisitos.md)
* [Arquitetura](docs/03-arquitetura.md)
* [Banco de dados](docs/04-banco-de-dados.md)
* [API](docs/05-api.md)
* [Frontend](docs/06-frontend.md)
* [Acessibilidade](docs/07-acessibilidade.md)
* [Testes](docs/08-testes.md)
* [Equipe](docs/09-equipe.md)
* [Próximos passos](docs/10-proximos-passos.md)

---

## 📌 Status

🟡 **Em desenvolvimento**

O projeto possui backend e frontend funcionais em módulos iniciais e continua em desenvolvimento com a integração das demais funcionalidades da equipe.
