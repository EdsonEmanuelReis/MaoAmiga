# 🤝 Mão Amiga

> **Tecnologia para facilitar o dia a dia de pessoas idosas.**

## 📌 Sobre o projeto

O **Mão Amiga** é um projeto acadêmico voltado à utilização da tecnologia para auxiliar pessoas idosas, especialmente aquelas que podem apresentar dificuldades relacionadas à visão e à utilização de dispositivos móveis.

O projeto possui dois módulos que podem funcionar de forma independente:

* 🖥️ **Sistema/API:** responsável pelo gerenciamento e organização das informações do idoso.
* 📱 **Aplicativo Android:** responsável pela interface simplificada e pelos recursos de acessibilidade.

Apesar de independentes, os módulos podem ser integrados futuramente para que informações do sistema possam ser utilizadas pelo aplicativo, por exemplo, na criação de lembretes.

---

# 🎯 Objetivos

* Facilitar a utilização de dispositivos móveis por pessoas idosas.
* Desenvolver uma interface simples e acessível.
* Auxiliar na organização da rotina do idoso.
* Centralizar informações importantes relacionadas ao acompanhamento do idoso.
* Permitir que responsáveis tenham acesso às informações necessárias para auxiliar no acompanhamento.
* Utilizar tecnologia como ferramenta de apoio à autonomia e ao bem-estar.

---

# 👥 Público-alvo

* Pessoas idosas, especialmente aquelas com dificuldades de visão ou utilização de smartphones.
* Familiares e responsáveis que auxiliam no acompanhamento dessas pessoas.

---

# 🧩 Estrutura do projeto

## 🖥️ Sistema/API

O backend é responsável por **gerenciar e organizar informações relacionadas ao idoso**.

A proposta é que essas informações possam acompanhar o responsável e, futuramente, também alimentar recursos do aplicativo.

### 👴 Idoso

Armazena informações básicas da pessoa acompanhada, incluindo:

* Nome
* Idade
* CPF
* Telefone
* E-mail
* Informações de acessibilidade
* Tamanho da fonte
* Responsável vinculado

### 👤 Responsável

Representa a pessoa que auxilia no acompanhamento do idoso.

O responsável pode ser vinculado ao idoso para que as informações relacionadas ao acompanhamento possam ser consultadas por quem auxilia no cuidado.

### 📅 Rotina

Organiza atividades e horários importantes do dia a dia.

Exemplos:

* Tomar medicamento
* Fazer uma refeição
* Realizar uma atividade
* Caminhar
* Ir a uma consulta

A proposta é que a rotina possa futuramente ser utilizada para **gerar lembretes** e auxiliar o responsável no acompanhamento.

### 💊 Remédios

**Módulo planejado.**

Terá como objetivo organizar informações sobre os medicamentos utilizados pelo idoso e seus respectivos horários.

Futuramente, essas informações poderão ser utilizadas para gerar lembretes no aplicativo.

### 🩺 Consultas

**Módulo planejado.**

Terá como objetivo organizar consultas e compromissos relacionados ao acompanhamento do idoso.

### ❤️ Registro de Saúde

**Módulo planejado.**

Terá como objetivo manter organizadas informações relevantes relacionadas ao acompanhamento da saúde do idoso.

> O projeto não tem como objetivo substituir atendimento médico, diagnóstico ou prontuários hospitalares.

---

# 📱 Aplicativo Android

O aplicativo possui uma proposta independente do sistema/API.

Seu objetivo principal é **facilitar a utilização do celular por pessoas idosas**, oferecendo uma interface mais simples e recursos de acessibilidade.

O protótipo está sendo desenvolvido utilizando **Android Studio e Kotlin**.

Entre os recursos trabalhados estão:

* 📞 Telefone
* 💬 Mensagens
* 📷 Câmera
* 🖼️ Galeria
* 🚨 Emergência
* 📱 Mais aplicativos
* 🔠 Aumento do tamanho da fonte
* Interface simplificada
* Recursos de acessibilidade

O aplicativo **não depende atualmente da API para funcionar**.

Uma possível integração entre os módulos poderá ser desenvolvida posteriormente.

---

# 🔗 Possível integração

Os módulos podem futuramente trabalhar juntos:

```text
Responsável
     ↓
Sistema / API
     ↓
Informações
     ↓
API REST
     ↓
Aplicativo Android
     ↓
Lembretes e informações para o idoso
```

Exemplo:

O responsável cadastra um medicamento e seu horário no sistema. Futuramente, o aplicativo poderá utilizar essa informação para apresentar um lembrete ao idoso.

---

# 🏗️ Arquitetura do Backend

O backend segue uma arquitetura em camadas:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
JPA / Hibernate
    ↓
MySQL
```

### Controller

Recebe as requisições HTTP e disponibiliza os endpoints da API.

### Service

Concentra as regras de negócio e validações.

### Repository

Realiza o acesso aos dados utilizando Spring Data JPA.

### JPA / Hibernate

Realiza o mapeamento entre as classes Java e as tabelas do banco.

### MySQL

Banco de dados utilizado pelo sistema.

---

# 🛠️ Tecnologias utilizadas

## Backend

* Java
* Spring Boot
* Spring Data JPA
* Hibernate
* Maven
* Lombok
* API REST

## Banco de dados

* MySQL
* SQL

## Interface Web

* HTML
* CSS
* JavaScript

## Aplicativo

* Kotlin
* Android Studio

## Ferramentas

* IntelliJ IDEA
* Insomnia
* Git
* GitHub

---

# 🔌 API

## 👤 Responsáveis

```text
POST   /responsavel/cadastrarResponsavel
GET    /responsavel/listarResponsavel
GET    /responsavel/buscarResponsavelPorId
PUT    /responsavel/atualizarResponsavel
DELETE /responsavel/deletarResponsavel
```

## 👴 Idosos

```text
POST   /idoso/cadastrarIdoso
GET    /idoso/listarIdoso
GET    /idoso/buscarIdosoPorId
PUT    /idoso/atualizarIdoso
DELETE /idoso/deletarIdoso
```

## 📅 Rotina

```text
POST   /rotina/registrarRotina
GET    /rotina/listarRotina
GET    /rotina/buscarIdRotina
PUT    /rotina/atualizarRotina
DELETE /rotina/deletarRotina
```

> Os módulos de Remédios, Consultas e Registro de Saúde ainda não possuem endpoints documentados porque estão previstos para etapas posteriores do desenvolvimento.

---

# ♿ Acessibilidade

O projeto considera recursos para facilitar a utilização por pessoas idosas e pessoas com baixa visão.

Entre os recursos desenvolvidos ou trabalhados:

* Textos maiores.
* Ícones de fácil identificação.
* Interface simplificada.
* Botões maiores.
* Navegação direta.
* Aumento do tamanho da fonte.
* Redução da quantidade de elementos por tela.

---

# 🧪 Testes

### Backend

Os endpoints são testados utilizando **Insomnia**, verificando:

* Cadastro
* Consulta
* Listagem
* Atualização
* Exclusão
* Validações
* Comunicação com o banco de dados

### Interface Web

São realizados testes relacionados à:

* Navegação.
* Comunicação com a API.
* Exibição dos dados.
* Cadastro e gerenciamento das informações.
* Aumento da fonte.

### Aplicativo Android

O protótipo é testado quanto à:

* Navegação.
* Abertura das funções.
* Tamanho da interface.
* Aumento da fonte.
* Persistência das configurações.
* Facilidade de utilização.

---

# 📚 Documentação

A documentação do projeto está sendo desenvolvida no **GitBook**, contendo informações sobre:

* Objetivos
* Requisitos
* Arquitetura
* Banco de dados
* API
* Interface
* Acessibilidade
* Testes
* Evolução do projeto

---

# 👨‍💻 Equipe

| Integrante | Responsabilidade                                        |
| ---------- | ------------------------------------------------------- |
| **Edson**  | Backend, API e integração                               |
| **Lucas**  | Backend e testes                                        |
| **Luiza**  | Inteligência Artificial                                 |
| **Diego**  | Inteligência Artificial e discussão do módulo de idosos |
| **Karlla** | Frontend, interface e testes                            |
| **Rafael** | A definir                                               |

---

# 🚀 Evolução do projeto

### Etapa 1 — Estrutura e banco de dados

* Definição do problema.
* Estrutura inicial do projeto.
* Modelagem do banco de dados.

### Etapa 2 — Backend

* Desenvolvimento da API REST.
* Implementação dos CRUDs de Idoso, Responsável e Rotina.
* Implementação das regras de negócio.
* Integração com MySQL.

### Etapa 3 — Interface Web

* Desenvolvimento da interface.
* Integração inicial com a API.
* Implementação dos recursos de acessibilidade.
* Gerenciamento das informações através da interface.

### Etapa 4 — Aplicativo Android

* Criação do protótipo Android.
* Desenvolvimento da interface mobile.
* Implementação dos recursos de acessibilidade.
* Testes de utilização.

### Próximas etapas

* Implementação dos CRUDs de Remédios.
* Implementação dos CRUDs de Consultas.
* Implementação dos Registros de Saúde.
* Evolução da rotina.
* Desenvolvimento de lembretes.
* Avaliação da integração entre API e aplicativo.
* Novos testes de acessibilidade e usabilidade.

---

# 📊 Status

🟡 **Em desenvolvimento**

### Atualmente implementado

* ✅ Backend Spring Boot
* ✅ API REST
* ✅ Banco de dados MySQL
* ✅ CRUD de Idoso
* ✅ CRUD de Responsável
* ✅ CRUD de Rotina
* ✅ Interface Web
* ✅ Integração inicial da interface Web com a API
* ✅ Recursos iniciais de acessibilidade
* ✅ Protótipo inicial do aplicativo Android
* 🔄 Desenvolvimento e testes do aplicativo Android

### Ainda em desenvolvimento

* ⏳ CRUD de Remédios
* ⏳ CRUD de Consultas
* ⏳ CRUD de Registro de Saúde
* ⏳ Recursos de lembretes
* ⏳ Possível integração entre aplicativo e API
* ⏳ Novos testes de acessibilidade e usabilidade
